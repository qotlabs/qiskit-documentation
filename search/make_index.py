#!/usr/bin/env python3

import logging
from pathlib import Path
from argparse import ArgumentParser
from dataclasses import dataclass
from markdown import Markdown
from typing import TextIO
from enum import Enum
from hashlib import sha256
import json
import xapian


class ParseError(Exception):
    pass

class UrlError(Exception):
    pass


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


class DocumentData:
    def __init__(self, data: bytes | None = None):
        if data is not None:
            self.from_bytes(data)

    def from_bytes(self, data: bytes):
        json_data = json.loads(data.decode())
        self.mtime = json_data["mtime"]
        self.url = json_data["url"]
        self.text = json_data["text"]

    def to_bytes(self) -> bytes:
        return json.dumps({
            "mtime": self.mtime,
            "url": self.url,
            "text": self.text
        }).encode()


def skip_md_header(file: TextIO) -> bool:
    ok  = file.readline() == "---\n"
    ok &= file.readline().startswith("title:")
    ok &= file.readline().startswith("description:")
    ok &= file.readline() == "---\n"
    if not ok:
        file.seek(0)
    return ok


def url_to_path(sourceDir: Path, url: str) -> Path:
    """Convert URL to the existing file path relative to source directory."""
    # Base path without extension
    base_path = sourceDir / url.removeprefix("/")
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
    raise UrlError(f"Cannot find path for URL {url}")


class Database:
    def __init__(self, path: Path, *,
                 read_only: bool = True):
        if read_only:
            self._database = xapian.Database(str(path))
        else:
            self._database = xapian.WritableDatabase(str(path), xapian.DB_CREATE_OR_OPEN)

        self._term_generator = xapian.TermGenerator()
        self._term_generator.set_stemmer(xapian.Stem("en"))

        self._enquire = xapian.Enquire(self._database)
        self._enquire.set_weighting_scheme(xapian.BoolWeight())

    def select_path(self, path_hash) -> xapian.MSet:
        self._database.reopen()
        self._enquire.set_query(xapian.Query('P' + path_hash.hexdigest()))
        return self._enquire.get_mset(0, self._database.get_doccount())


class Visitor:
    def __init__(self, source: Path, destination: Path):
        self.sourceDir = source
        self.database = Database(destination, read_only=False)


    @staticmethod
    def ignore_url(url: str) -> bool:
        return url.startswith("https://")


    def index(self):
        self.updated_dids = set()
        for toc_path in self.sourceDir.rglob("_toc.json"):
            logging.debug("Process table of contents %s", toc_path)
            with open(toc_path, "r") as toc:
                self.visit_toc(json.load(toc))


    def visit_toc(self, toc: dict):
        url = toc.get("url")
        ok = True
        if url is None:
            ok = False
            logging.debug("TOC node '%s' does not contain 'url' field", toc.get("title"))
        if ok and Visitor.ignore_url(url):
            ok = False
            logging.debug("Ignore URL %s", url)
        if ok:
            self.visit_url(url)
        for child in toc.get("children", ()):
            self.visit_toc(child)


    def visit_url(self, url: str):
        try:
            path = url_to_path(self.sourceDir, url)
            path_hash = sha256(str(path.relative_to(self.sourceDir)).encode())
            matches = self.database.select_path(path_hash)
            if not matches.empty():
                doc_data = DocumentData(matches[0].document.get_data())
                if path.stat().st_mtime <= doc_data.mtime:
                    logging.debug("Skip up-to-date URL %s", url)
                    for match in matches:
                        logging.debug("Mark DID %d as up-to-date", match)
                        self.updated_dids.add(match)
                    return
            self.visit_path(path)
        except Exception as e:
            logging.warning(e)

    def visit_path(self, path: Path):
        logging.info("Visit %s", path)
        return
        module = DocModule.DOCUMENTATION
        version = 0.45
        match url.split("/")[1:]:
            case ["api", section, _]:
                module = DocModule.API
            case ["api", section, version, _]:
                module = DocModule.API
            case [section, *_]:
                pass
            case _:
                logging.error("Invalid URL %s", url)

        section = DocSection[section.replace("-", "_").upper()]
        version = float(version)
        self.documents.append({"url": url, "path": path, "module": module, "section": section, "version": version})


def parse_md(path: Path):
    with open(path, "r") as file:
        pass


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
                        default="INFO",
                        choices=["debug", "info", "warn", "error"],
                        help="set the logging level")
    args = parser.parse_args()

    logging.basicConfig(level=logging.getLevelName(args.log_level.upper()),
                        format="%(relativeCreated)-6d %(message)s")

    logging.info("Start indexing '%s' to '%s'", args.source, args.destination)
    try:
        visitor = Visitor(Path(args.source), Path(args.destination))
        visitor.index()
        logging.info("Finish indexing")
    except Exception as e:
        logging.error("Indexing fail due to exception: %s", e)
