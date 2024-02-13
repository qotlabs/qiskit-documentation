# SPDX-License-Identifier: Apache-2.0
# SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
# SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

import xapian
import json
from pathlib import Path
from struct import Struct
from document import Document, DocModule, DocSection

MTIME_SLOT = 0
MTIME_STRUCT = Struct("<d")


class Database:
    def __init__(
        self,
        path: Path,
        read_only: bool = True
    ):
        if read_only:
            self._database = xapian.Database(str(path))
        else:
            self._database = xapian.WritableDatabase(str(path), xapian.DB_CREATE_OR_OPEN)

        self._stemmer = xapian.Stem("en")
        self._term_generator = xapian.TermGenerator()
        self._term_generator.set_stemmer(self._stemmer)
        self._term_generator.set_stemming_strategy(xapian.TermGenerator.STEM_ALL)

        self._benquire = xapian.Enquire(self._database)
        self._benquire.set_weighting_scheme(xapian.BoolWeight())

        self._enquire = xapian.Enquire(self._database)

    def __iter__(self):
        return self._database.postlist("")

    def search(
        self,
        query: str,
        module: DocModule,
        version: float = 0,
        offset: int = 0,
        page_size: int = 50,
        snippet_len = 200
    ) -> list[Document]:
        Q = xapian.Query
        query = [self._stemmer(word) for word in query.split()]
        query = Q(Q.OP_PHRASE, query)
        query = Q(Q.OP_AND, [f"XM{module.value}", f"XV{version}", query])
        self._enquire.set_query(query)
        docs = []
        mset = self._enquire.get_mset(offset, page_size)
        for match in mset:
            xdoc = match.document
            json_data = json.loads(xdoc.get_data().decode())
            docs.append(Document(
                text=mset.snippet(
                    json_data["T"],
                    snippet_len,
                    self._stemmer,
                    xapian.MSet.SNIPPET_BACKGROUND_MODEL |
                    xapian.MSet.SNIPPET_EXHAUSTIVE,
                    "<em>", "</em>"
                ).decode(),
                docid=match.docid,
                _url=json_data["U"],
                page_title=json_data["PT"],
                _title=json_data["S"],
                module=DocModule(json_data["XM"]),
                section=DocSection(json_data["XS"]),
            ))
        return docs

    def search_path(self, path_hash: str) -> tuple[float, list[int]] | None:
        self._benquire.set_query(xapian.Query(f"P{path_hash}"))
        matches = self._benquire.get_mset(0, self._database.get_doccount())
        if matches.empty():
            return None
        docids = [m.docid for m in matches]
        mtime = MTIME_STRUCT.unpack(matches[0].document.get_value(MTIME_SLOT))[0]
        return mtime, docids

    def replace_document(self, doc: Document) -> int:
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
            "U": doc.url,
            "T": doc.text,
            "PT": doc.page_title,
            "S": doc.title,
            "XM": doc.module.value,
            "XS": doc.section.value,
        }).encode())

        xdoc.add_value(MTIME_SLOT, MTIME_STRUCT.pack(doc.mtime))

        return self._database.replace_document(id_term, xdoc)

    def delete_document(self, doc_id: int | str):
        self._database.delete_document(doc_id)
