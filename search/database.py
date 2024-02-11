import xapian
import json
from pathlib import Path
from struct import Struct
from document import Document

MTIME_SLOT = 0
MTIME_STRUCT = Struct("<d")


class Database:
    @staticmethod
    def get_mtime(match) -> float:
        return MTIME_STRUCT.unpack(match.document.get_value(MTIME_SLOT))[0]


    def __init__(self,
            path: Path,
            read_only: bool = True
        ):
        if read_only:
            self._database = xapian.Database(str(path))
        else:
            self._database = xapian.WritableDatabase(str(path), xapian.DB_CREATE_OR_OPEN)

        self._term_generator = xapian.TermGenerator()
        self._term_generator.set_stemmer(xapian.Stem("en"))

        self._benquire = xapian.Enquire(self._database)
        self._benquire.set_weighting_scheme(xapian.BoolWeight())


    def __iter__(self):
        return self._database.postlist("")


    def search_path(self, path_hash: str) -> xapian.MSet:
        self._benquire.set_query(xapian.Query(f"P{path_hash}"))
        return self._benquire.get_mset(0, self._database.get_doccount())


    def replace_document(self, doc: Document) -> int:
        xdoc = xapian.Document()
        self._term_generator.set_document(xdoc)

        self._term_generator.index_text(doc.title, 1, "S")
        self._term_generator.index_text(doc.page_title)
        self._term_generator.increase_termpos()
        self._term_generator.index_text(doc.title)
        self._term_generator.increase_termpos()
        self._term_generator.index_text(doc.text)

        id_term = f"Q{doc.url_hash}"
        xdoc.add_boolean_term(id_term)
        xdoc.add_boolean_term(f"P{doc.path_hash}")
        xdoc.add_boolean_term(f"XM{doc.module.value}")
        xdoc.add_boolean_term(f"XS{doc.section.value}")
        if doc.version != 0:
            xdoc.add_boolean_term(f"XV{doc.version}")

        xdoc.set_data(json.dumps({
            "U": doc.url,
            "T": doc.text
        }).encode())

        xdoc.add_value(MTIME_SLOT, MTIME_STRUCT.pack(doc.mtime))

        return self._database.replace_document(id_term, xdoc)


    def delete_document(self, doc_id: int | str):
        self._database.delete_document(doc_id)