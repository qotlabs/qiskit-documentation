#!/usr/bin/env python3

import logging
import json
import xapian
import re
from dataclasses import dataclass
from enum import Enum
from argparse import ArgumentParser
from pathlib import Path
from hashlib import sha256
from io import StringIO
from time import time

HEADER_REGEX = re.compile(r" *#{1,3}[^#](.*)")
CODE_BLOCK_REGEX = re.compile(r"[ \t]*```[a-zA-Z0-9]*")
TAG_REGEX = re.compile(r"<[^>]+>|[#*_~`\\]+")


def url_to_path(root: Path, url: str) -> Path:
    """Convert URL to the existing file path relative to root directory."""
    # Base path without extension
    base_path = root / url.removeprefix("/")
    # First try different extensions
    for ext in "md", "mdx", "ipynb":
        path = Path(f"{base_path}.{ext}")
        if path.exists():
            return path
    # Then try to find index file
    for index in "index.md", "index.mdx":
        path = base_path / index
        if path.exists():
            return path
    raise ValueError(f"Cannot find path for URL {url}")


def calc_hash(s: str) -> str:
    return sha256(s.encode()).hexdigest()


def remove_tags(s: str) -> str:
    return TAG_REGEX.sub("", s)


def skip_md_banner(file: StringIO) -> bool:
    # Check the first line
    if file.readline() != "---\n":
        file.seek(0)
        return False
    # Skip the header
    for line in file:
        if line == "---\n":
            return True
    # Fail-safe
    file.seek(0)
    return False


class DocModule(Enum):
    DOCUMENTATION = 1
    API = 2


class DocSection(Enum):
    MIGRATION_GUIDES = 1
    QISKIT = 2
    QISKIT_IBM_PROVIDER = 3
    QISKIT_IBM_RUNTIME = 4
    BUILD = 5
    RUN = 6
    START = 7
    TRANSPILE = 8
    VERIFY = 9

    @staticmethod
    def from_str(s: str):
        return DocSection[s.replace("-", "_").upper()]


@dataclass
class Document:
    page_url: str | None = None
    _url: str | None = None
    _url_hash: str | None = None
    path: Path | None = None
    rel_path: str | None = None
    path_hash: str | None = None
    mtime: float | None = None
    module: DocModule | None = None
    section: DocSection | None = None
    version: float = 0
    page_title: str | None = None
    _title: str | None = None
    text: str | None = None

    @property
    def url(self) -> str | None:
        return self._url

    @property
    def url_hash(self) -> str | None:
        return self._url_hash

    @property
    def title(self) -> str | None:
        return self._title

    @title.setter
    def title(self, val: str):
        self._title = val
        self._url = f"{self.page_url}#{self._title}"
        self._url_hash = calc_hash(self._url)

    @staticmethod
    def from_db(data: bytes):
        json_data = json.loads(data.decode())
        return Document(
            _url=json_data["url"],
            mtime=json_data["mtime"],
            text=json_data["text"],
        )

    def to_db(self) -> bytes:
        return json.dumps({
            "mtime": self.mtime,
            "url": self.url,
            "text": self.text
        }).encode()


class Database:
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

        self._enquire = xapian.Enquire(self._database)
        self._enquire.set_weighting_scheme(xapian.BoolWeight())


    def __iter__(self):
        return self._database.postlist("")


    def select_path(self, path_hash: str) -> xapian.MSet:
        self._enquire.set_query(xapian.Query(f"P{path_hash}"))
        return self._enquire.get_mset(0, self._database.get_doccount())


    def replace_document(self, doc: Document) -> int:
        xdoc = xapian.Document()
        self._term_generator.set_document(xdoc)

        self._term_generator.index_text(doc.title, 1, "S")
        self._term_generator.index_text(doc.page_title)
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

        xdoc.set_data(doc.to_db())

        return self._database.replace_document(id_term, xdoc)


    def delete_document(self, doc_id: int):
        self._database.delete_document(doc_id)


class Visitor:
    def __init__(self, source: Path, destination: Path):
        self.sourceDir = source
        self.database = Database(destination, read_only=False)


    @staticmethod
    def ignore_url(url: str) -> bool:
        return url.startswith("https://")


    def index(self):
        self.updated_docids = set()
        self.indexed = 0
        self.uptodate = 0
        for toc_path in self.sourceDir.rglob("_toc.json"):
            logging.debug("Process table of contents %s", toc_path)
            with open(toc_path, "r") as toc:
                self.visit_toc(json.load(toc))
        self.delete()


    def delete(self):
        for xdoc in self.database:
            if xdoc.docid not in self.updated_docids:
                logging.info("Delete #%d", xdoc.docid)
                self.database.delete_document(xdoc.docid)


    def visit_toc(self, toc: dict):
        page_url = toc.get("url")
        ok = True
        if page_url is None:
            ok = False
            logging.debug("TOC node '%s' does not contain 'url' field", toc.get("title"))
        if ok and Visitor.ignore_url(page_url):
            ok = False
            logging.debug("Ignore URL %s", page_url)
        if ok:
            try:
                doc = Document(page_url=page_url)
                doc.page_title = toc["title"]
                self.visit_page_url(doc)
            except Exception as e:
                logging.warning(e)
        for child in toc.get("children", ()):
            self.visit_toc(child)


    def visit_page_url(self, doc: Document):
        # Find document path and related fields
        doc.path = url_to_path(self.sourceDir, doc.page_url)
        doc.rel_path = str(doc.path.relative_to(self.sourceDir))
        doc.path_hash = calc_hash(doc.rel_path)
        doc.mtime = doc.path.stat().st_mtime

        # Check whether database update is necessary
        matches = self.database.select_path(doc.path_hash)
        if not matches.empty():
            db_doc = Document.from_db(matches[0].document.get_data())
            if doc.mtime <= db_doc.mtime:
                logging.debug("Skip up-to-date URL %s", doc.page_url)
                self.uptodate += 1
                for match in matches:
                    logging.debug("Mark #%d as up-to-date", match.docid)
                    self.updated_docids.add(match.docid)
                return

        # Find document module, section, and version from URL
        chunks = doc.page_url.split("/")
        if chunks[1] == "api":
            doc.module = DocModule.API
            doc.section = DocSection.from_str(chunks[2])
            try:
                if chunks[3] == "release-notes":
                    doc.version = float(chunks[4])
                else:
                    doc.version = float(chunks[3])
            except:
                pass # Leave `doc.version == 0`
        else:
            doc.module = DocModule.DOCUMENTATION
            doc.section = DocSection.from_str(chunks[1])

        self.visit_path(doc)


    def visit_path(self, doc: Document):
        logging.info("Index %s", doc.rel_path)
        match doc.path.suffix:
            case ".md" | ".mdx":
                self.visit_md(doc)
            case ".ipynb":
                self.visit_ipynb(doc)
            case _:
                # Should never execute unless there is an error in the program
                logging.error("No file handler for %s", doc.rel_path)
        self.indexed += 1


    def visit_md(self, doc: Document):
        with open(doc.path) as file:
            skip_md_banner(file)
            doc.title = doc.page_title
            doc.text = ""
            code_block = False
            for line in file:
                if CODE_BLOCK_REGEX.match(line):
                    code_block = not code_block
                header = HEADER_REGEX.match(line)
                if not header or code_block:
                    doc.text += line
                    continue
                doc.title = remove_tags(header.group(1))
                self.visit_text(doc)
                doc.text = ""
            self.visit_text(doc)


    def visit_ipynb(self, doc: Document):
        with open(doc.path, "r") as file:
            cells = json.load(file)["cells"]
            doc.title = doc.page_title
            doc.text = ""
            for cell in cells:
                match cell["cell_type"]:
                    case "markdown":
                        for line in cell["source"]:
                            header = HEADER_REGEX.match(line)
                            if not header:
                                doc.text += line
                                continue
                            doc.title = remove_tags(header.group(1))
                            self.visit_text(doc)
                            doc.text = ""
                    case "code":
                        doc.text += "".join(cell["source"])
            self.visit_text(doc)


    def visit_text(self, doc: Document):
        doc.text = remove_tags(doc.text).strip()
        if len(doc.text) == 0:
            return
        docid = self.database.replace_document(doc)
        logging.debug("Index section #%d %s", docid, doc.title)
        self.updated_docids.add(docid)


def path_relative_to_script(path: str) -> str:
    return str((Path(__file__).parent / path).relative_to(Path.cwd()))


if __name__ == "__main__":
    parser = ArgumentParser(description="Make Xapian search index of Qiskit documentation.")
    parser.add_argument("-s, --source", dest="source",
                        metavar="DIR",
                        default=path_relative_to_script("../docs/docs"),
                        help="set source directory with documentation for indexing")
    parser.add_argument("-d, --destination", dest="destination",
                        metavar="DIR",
                        default=path_relative_to_script("index"),
                        help="set Xapian database directory")
    parser.add_argument("-l, --log-level", dest="log_level",
                        default="info",
                        choices=["debug", "info", "warn", "error"],
                        help="set the logging level")
    args = parser.parse_args()

    logging.basicConfig(level=logging.getLevelName(args.log_level.upper()),
                        format="%(message)s")

    print(f"Start indexing '{args.source}' to '{args.destination}'")
    duration = time()
    try:
        visitor = Visitor(Path(args.source), Path(args.destination))
        visitor.index()
        duration = time() - duration
        total = visitor.indexed + visitor.uptodate
        print(f"Finish indexing of {total} documents ({visitor.indexed} modified) "
              f"in {duration:.3} seconds")
    except Exception as e:
        logging.error("Indexing fail due to exception: %s", e)
