#!/usr/bin/env python3

from argparse import ArgumentParser
from pathlib import Path
from time import time
from database import Database


def path_relative_to_script(path: str) -> str:
    return str((Path(__file__).parent / path).relative_to(Path.cwd()))


if __name__ == "__main__":
    parser = ArgumentParser(description="Search in Xapian index of Qiskit documentation.")
    parser.add_argument("-d, --destination", dest="destination",
                        metavar="DIR",
                        default=path_relative_to_script("index"),
                        help="set Xapian database directory")
    parser.add_argument("-n, --number", dest="number",
                        metavar="NUM",
                        type=int,
                        default=5,
                        help="set the number of returned results")
    parser.add_argument("query",
                        help="search query string")
    args = parser.parse_args()

    db = Database(Path(args.destination))
    duration = time()
    for doc in reversed(db.search(args.query, page_size=args.number)):
        print(f"\033[1;36m{doc.url}\033[0m:\n{doc.text}\n")
    duration = time() - duration
    print(f"Finish search in {duration:.3} seconds")
