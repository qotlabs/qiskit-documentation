# SPDX-License-Identifier: GPL-3.0-or-later
# SPDX-FileCopyrightText: Copyright (c) 2024-2025 Quantum Optical Technologies Laboratories
# SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

import re
from dataclasses import dataclass
from enum import Enum
from hashlib import sha256
from pathlib import Path


VERSION_LATEST = ""

TITLE_REGEX = re.compile(r"[^\w\d_\.]+")
SPACE_REGEX = re.compile(r"\s+")
VERSION_REGEX = re.compile(r"^$|dev|[0-9]\.[0-9]+")


class DocModule(Enum):
    """Documentation module."""
    DOCUMENTATION = 1
    API = 2

    @staticmethod
    def from_str(s: str):
        return DocModule[s.upper()]

    def __str__(self):
        return self.name.lower()


class DocSection(Enum):
    """Documentation section."""
    QISKIT = 1
    QISKIT_IBM_RUNTIME = 2
    QISKIT_IBM_TRANSPILER = 3
    QISKIT_ADDON_AQC_TENSOR = 4
    QISKIT_ADDON_CUTTING = 5
    QISKIT_ADDON_MPF = 6
    QISKIT_ADDON_OBP = 7
    QISKIT_ADDON_SQD = 8
    QISKIT_ADDON_UTILS = 9
    QISKIT_C = 10
    GUIDES = 20
    MIGRATION_GUIDES = 30
    OPEN_SOURCE = 40
    SECURITY = 50
    SUPPORT = 60
    TUTORIALS = 70

    @staticmethod
    def from_str(s: str):
        return DocSection[s.replace("-", "_").upper()]

    def __str__(self):
        return self.name.replace("_", "-").lower()


class DocLevel(Enum):
    """Document level."""
    H1 = 1
    H2 = 2
    H3 = 3


def calc_hash(s: str) -> str:
    """Calculate SHA-256 hash and return hex-encoded string."""
    return sha256(s.encode()).hexdigest()


def normalize_title(s: str) -> str:
    """Normalize the given title.

    The function converts to lower case, leaves only alpha-numeric characters,
    and replaces consecutive spaces by `-`.
    """
    s = TITLE_REGEX.sub(" ", s.lower())
    s = SPACE_REGEX.sub("-", s.strip())
    return s


@dataclass
class Document:
    """Indexed document stored in the database."""

    page_url: str | None = None
    _url: str | None = None
    _url_hash: str | None = None
    path: Path | None = None
    rel_path: str | None = None
    path_hash: str | None = None
    mtime: float | None = None
    module: DocModule | None = None
    section: DocSection | None = None
    version: str = VERSION_LATEST
    page_title: str | None = None
    level: DocLevel | None = None
    _title: str | None = None
    text: str | None = None
    docid: int = 0

    @property
    def url(self) -> str | None:
        """Get document URL."""
        return self._url

    @property
    def url_hash(self) -> str | None:
        """Get URL hash."""
        return self._url_hash

    @property
    def title(self) -> str | None:
        """Get document title."""
        return self._title

    @title.setter
    def title(self, val: str):
        """Set new document title.

        Pre-condition: `page_url` must be valid.
        Post-condition: `title`, `url`, and `url_hash` are modified.
        """
        self._title = val
        self._url = f"{self.page_url}#{normalize_title(self._title)}"
        self._url_hash = calc_hash(self._url)

    def parse_page_url(self):
        """Fill `module`, `section`, and `version` based on `page_url`.

        Pre-condition: `page_url` must be valid.
        Post-condition: `module`, `section`, and `version` are modified.
        """
        chunks = self.page_url.split("/")
        if chunks[2] == "api":
            self.module = DocModule.API
            self.section = DocSection.from_str(chunks[3])
            try:
                if chunks[4] == "release-notes":
                    version = chunks[5]
                else:
                    version = chunks[4]
            except:
                version = VERSION_LATEST
            if VERSION_REGEX.fullmatch(version):
                self.version = version
            #else:
            #    assert(not any(VERSION_REGEX.fullmatch(c) for c in chunks[2:]))
        else:
            self.module = DocModule.DOCUMENTATION
            self.section = DocSection.from_str(chunks[2])
