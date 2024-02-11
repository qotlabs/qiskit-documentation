from dataclasses import dataclass
from enum import Enum
from hashlib import sha256
from pathlib import Path


class DocModule(Enum):
    DOCUMENTATION = 1
    API = 2

    def __str__(self):
        return self.name.lower()


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

    def __str__(self):
        return self.name.replace("_", "-").lower()


def calc_hash(s: str) -> str:
    return sha256(s.encode()).hexdigest()


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


    def parse_page_url(self):
        """Fill `module`, `section`, and `version` based on `page_url`.

        Pre-condition: `page_url` must be valid.
        Post-condition: `module`, `section`, and `version` are modified.
        """
        chunks = self.page_url.split("/")
        if chunks[1] == "api":
            self.module = DocModule.API
            self.section = DocSection.from_str(chunks[2])
            try:
                if chunks[3] == "release-notes":
                    self.version = float(chunks[4])
                else:
                    self.version = float(chunks[3])
            except:
                pass # Leave `version == 0`
        else:
            self.module = DocModule.DOCUMENTATION
            self.section = DocSection.from_str(chunks[1])
