#!/usr/bin/env python3

import os
import logging
from pathlib import Path
from argparse import ArgumentParser
from dataclasses import dataclass
from markdown import Markdown
from typing import TextIO
import json
import xapian

class ParseException(Exception):
    pass

@dataclass
class ParsedMarkdown:
    title: str
    text: str

def skip_md_header(file: TextIO) -> bool:
    ok  = file.readline() == "---\n"
    ok &= file.readline().startswith("title:")
    ok &= file.readline().startswith("description:")
    ok &= file.readline() == "---\n"
    if not ok:
        file.seek(0)
    return ok

def append_md_suffix(path: Path) -> Path | None:
    for ext in ".md", ".mdx", ".ipynb":
        new_path = path.with_suffix(ext)
        if new_path.exists():
            return new_path
    return None

def url_to_path(source: Path, url: str) -> Path:
    base_path = source / url.removeprefix("/")
    path = append_md_suffix(base_path)
    if path is None:
        path = append_md_suffix(base_path / "index")
    if path is None:
        logging.error(f"Cannot find path with source matching URL: {base_path}")
        #raise RuntimeError(f"Cannot find path with source matching URL: {url}")
    return path


def parse_md(path: Path):
    with open(path, "r") as file:
        pass

def visit_toc(source, toc: dict):
    #print("title:", toc["title"])
    if "url" in toc:
        pass
        #print("url:", toc["url"])
        url_to_path(source, toc["url"])
    if "children" not in toc:
        return
    for child in toc["children"]:
        visit_toc(source, child)


def index(source: Path, destination: Path):
    db = xapian.WritableDatabase(str(destination), xapian.DB_CREATE_OR_OPEN)
    term_generator = xapian.TermGenerator()
    term_generator.set_stemmer(xapian.Stem("en"))

    for toc_path in source.rglob("_toc.json"):
        logging.debug("Processing table of contents %s", toc_path)
        with open(toc_path, "r") as toc:
            toc = json.load(toc)
            visit_toc(source, toc)

    return

    for toc_path in source.rglob("*.md*"):
        try:
            relpath = toc_path.relative_to(source)
            logging.info("Indexing %s", relpath)
            parse_md(toc_path)
        except ParseException as e:
            logging.warning("Skipping %s due to parsing error: %s", relpath, e)


if __name__ == "__main__":
    os.chdir(Path(__file__).parent)

    parser = ArgumentParser(description="Make Xapian search index of Qiskit documentation.")
    parser.add_argument("-s, --source", dest="source",
                        metavar="dir",
                        default="../docs/docs",
                        help="set source directory with documentation for indexing")
    parser.add_argument("-d, --destination", dest="destination",
                        metavar="dir",
                        default="index",
                        help="set destination Xapian database directory")
    parser.add_argument("-l, --log-level", dest="log_level",
                        default="INFO",
                        choices=["debug", "info", "warn", "error"],
                        help="set the logging level")
    args = parser.parse_args()

    logging.basicConfig(level=logging.getLevelName(args.log_level.upper()),
                        format="%(message)s")
    logging.debug("Working directory: %s", Path.cwd().absolute())
    logging.info("Started indexing. Source location is '%s', database path is '%s'",
                 args.source, args.destination)

    index(Path(args.source), Path(args.destination))
