#!/usr/bin/env python3

import logging
import json
import re
import argparse
from pathlib import Path
from typing import TextIO
from time import time
from document import Document, calc_hash
from database import Database

HEADER_REGEX = re.compile(r"\s*#{1,3}[^#](.*)")
CODE_BLOCK_REGEX = re.compile(r"\s*```[\w\d]*")
TAG_REGEX = re.compile(r"<[^>]+>|[#*_~`\\]+|\-\-+")


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


def remove_tags(s: str) -> str:
    return TAG_REGEX.sub("", s)


def skip_md_banner(file: TextIO) -> bool:
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


class Statistics:
    modified_docs: int = 0
    uptodate_docs: int = 0

    @property
    def total_docs(self) -> int:
        return self.modified_docs + self.uptodate_docs


class Visitor:
    def __init__(self, source: Path, destination: Path, force_update: bool = False):
        self.source_dir = source
        self.database = Database(destination, read_only=False)
        self.force_update = force_update


    @staticmethod
    def ignore_url(url: str) -> bool:
        return url.startswith("https://")


    def index(self):
        self.visited_docids = set()
        self.stats = Statistics()

        # Index new and modified files
        for toc_path in self.source_dir.rglob("_toc.json"):
            logging.debug("Process table of contents %s", toc_path)
            with open(toc_path, "r") as toc:
                self.visit_toc(json.load(toc))

        # Delete expired documents from the database
        for post in self.database:
            if post.docid not in self.visited_docids:
                logging.info("Delete #%d", post.docid)
                self.database.delete_document(post.docid)


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


    def need_update(self, doc: Document) -> bool:
        match self.database.search_path(doc.path_hash):
            case db_mtime, docids:
                if doc.mtime > db_mtime:
                    return True
                logging.debug("Skip up-to-date URL %s", doc.page_url)
                self.stats.uptodate_docs += 1
                for docid in docids:
                    logging.debug("Mark #%d as up-to-date", docid)
                    self.visited_docids.add(docid)
                return False
        return True


    def visit_page_url(self, doc: Document):
        doc.path = url_to_path(self.source_dir, doc.page_url)
        doc.rel_path = str(doc.path.relative_to(self.source_dir))
        doc.path_hash = calc_hash(doc.rel_path)
        doc.mtime = doc.path.stat().st_mtime
        if self.force_update or self.need_update(doc):
            doc.parse_page_url()
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
        self.stats.modified_docs += 1


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
                self.visit_text(doc)
                doc.title = remove_tags(header.group(1))
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
                            self.visit_text(doc)
                            doc.title = remove_tags(header.group(1))
                            doc.text = ""
                    case "code":
                        doc.text += "".join(cell["source"])
            self.visit_text(doc)


    def visit_text(self, doc: Document):
        doc.text = remove_tags(doc.text).strip()
        if len(doc.text) == 0:
            return
        logging.debug("Index section %s", doc.title)
        docid = self.database.replace_document(doc)
        self.visited_docids.add(docid)


def path_relative_to_script(path: str) -> str:
    return str((Path(__file__).parent / path).relative_to(Path.cwd()))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Make Xapian search index of Qiskit documentation."
    )
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
    parser.add_argument("-f, --force", dest="force",
                        action=argparse.BooleanOptionalAction,
                        help="force full update of the database")
    args = parser.parse_args()

    logging.basicConfig(level=logging.getLevelName(args.log_level.upper()),
                        format="%(message)s")

    print(f"Start indexing '{args.source}' to '{args.destination}'")
    duration = time()
    try:
        visitor = Visitor(Path(args.source), Path(args.destination), args.force)
        visitor.index()
        duration = time() - duration
        stats = visitor.stats
        print(f"Finish indexing of {stats.total_docs} documents "
              f"({stats.modified_docs} modified) in {duration:.3} seconds")
    except Exception as e:
        logging.error("Indexing fail due to exception: %s", e)
