# SPDX-License-Identifier: Apache-2.0
# SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
# SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

import xapian
import json
import threading
from pathlib import Path
from struct import Struct
from document import Document, DocModule, DocSection

MTIME_SLOT = 0
MTIME_STRUCT = Struct("<d")


class Database:
    """Search index database powered by Xapian.

    All methods are thread safe except `__iter__`.

    Prefixes starting with "D" are stored only in the document data. Others
    are also used for terms. The full prefix list:
    Q - unique ID that is equal to the document URL hash.
    S - subject, i.e. document title.
    P - path hash.
    XM - documentation module.
    XS - documentation section.
    XV - version (for API).
    DU - document URL.
    DT - document text.
    DS - page title.
    """

    def __init__(
        self,
        path: Path,
        read_only: bool = True
    ):
        """Construct new database object.

        path - path to the database.
        read_only - whether to open the database in read-only or writable mode.
        """
        self._lock = threading.Lock()

        if read_only:
            self._database = xapian.Database(str(path))
        else:
            self._database = xapian.WritableDatabase(str(path), xapian.DB_CREATE_OR_OPEN)
        self._update_etag()

        self._stemmer = xapian.Stem("en")
        self._term_generator = xapian.TermGenerator()
        self._term_generator.set_stemmer(self._stemmer)
        self._term_generator.set_stemming_strategy(xapian.TermGenerator.STEM_ALL)

        self._benquire = xapian.Enquire(self._database)
        self._benquire.set_weighting_scheme(xapian.BoolWeight())

        self._enquire = xapian.Enquire(self._database)

    def _update_etag(self):
        self._etag = f"{self._database.get_uuid().decode()}-{self._database.get_revision()}"

    @property
    def etag(self) -> str:
        """ETag of the database.

        ETag is equal to the database UUID concatenated with the revision
        number. ETag is used in HTTP caching mechanism.
        """
        with self._lock:
            return self._etag

    def __iter__(self):
        """Iterate over all posts in the database."""
        return self._database.postlist("")

    def reopen(self):
        """Reopen the database in case of modifications."""
        with self._lock:
            self._database.reopen()
            self._update_etag()

    def search(
        self,
        query: str,
        module: DocModule,
        version: float = 0,
        offset: int = 0,
        limit: int = 50,
        snippet_length: int = 200
    ) -> list[Document]:
        """Search in the database.

        query - string with a phrase for search.
        module - specify documentation module for search.
        version - specify API version for search. Zero means undefined version
                  or the latest version.
        offset - skip `offset` documents from the list with results. Useful for
                 pagination.
        limit - number of returned results. Useful for pagination.
        snippet_length - number of characters in truncated document text
                         (snippet).

        Return a list of found documents.
        """
        with self._lock:
            Q = xapian.Query
            query = [self._stemmer(word) for word in query.lower().split()]
            query = Q(Q.OP_PHRASE, query)
            query = Q(Q.OP_AND, [f"XM{module.value}", f"XV{version}", query])
            self._enquire.set_query(query)
            docs = []
            mset = self._enquire.get_mset(offset, limit)
            for match in mset:
                json_data = json.loads(match.document.get_data().decode())
                docs.append(Document(
                    text=mset.snippet(
                        json_data["DT"],
                        snippet_length,
                        self._stemmer,
                        xapian.MSet.SNIPPET_BACKGROUND_MODEL |
                        xapian.MSet.SNIPPET_EXHAUSTIVE,
                        "<em>", "</em>"
                    ).decode(),
                    docid=match.docid,
                    _url=json_data["DU"],
                    page_title=json_data["DS"],
                    _title=json_data["S"],
                    module=DocModule(json_data["XM"]),
                    section=DocSection(json_data["XS"]),
                ))
            return docs

    def search_path(self, path_hash: str) -> tuple[float, list[int]] | None:
        """Search for the documents with given path.

        Path is specified by its hash (hex digest).

        Return a tuple containing modification time `mtime` of the documents and
        a list of document IDs.
        """
        with self._lock:
            self._benquire.set_query(xapian.Query(f"P{path_hash}"))
            matches = self._benquire.get_mset(0, self._database.get_doccount())
            if matches.empty():
                return None
            docids = [m.docid for m in matches]
            mtime = MTIME_STRUCT.unpack(matches[0].document.get_value(MTIME_SLOT))[0]
            return mtime, docids

    def replace_document(self, doc: Document) -> int:
        """Replace document in the database.

        If there is no document for replacement in the database then the method
        simply adds the document.

        Return the modified document ID.
        """
        with self._lock:
            xdoc = xapian.Document()
            self._term_generator.set_document(xdoc)

            self._term_generator.index_text(doc.title, 1, "S")
            self._term_generator.index_text(doc.page_title, 5)
            self._term_generator.increase_termpos()
            self._term_generator.index_text(doc.title, 10)
            self._term_generator.increase_termpos()
            self._term_generator.index_text(doc.text)

            id_term = f"Q{doc.url_hash}"
            xdoc.add_boolean_term(id_term)
            xdoc.add_boolean_term(f"P{doc.path_hash}")
            xdoc.add_boolean_term(f"XM{doc.module.value}")
            xdoc.add_boolean_term(f"XS{doc.section.value}")
            xdoc.add_boolean_term(f"XV{doc.version}")

            xdoc.set_data(json.dumps({
                "DU": doc.url,
                "DT": doc.text,
                "DS": doc.page_title,
                "S": doc.title,
                "XM": doc.module.value,
                "XS": doc.section.value,
            }).encode())

            xdoc.add_value(MTIME_SLOT, MTIME_STRUCT.pack(doc.mtime))

            return self._database.replace_document(id_term, xdoc)

    def delete_document(self, docid: int | str):
        """Delete document with the given ID."""
        with self._lock:
            self._database.delete_document(docid)
