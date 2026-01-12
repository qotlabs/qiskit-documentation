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
    API = 0
    DOCUMENTATION = 1
    TUTORIALS = 2
    LEARNING = 3

    @staticmethod
    def from_str(s: str):
        return DocModule[s.upper()]

    def __str__(self):
        return self.name.lower()


# Documentation module enum with string values.
DocModuleStr = Enum("DocModuleStr", [(m.name, m.name.lower()) for m in DocModule])


class DocSection:
    """Documentation section.

    The dictionary `SECTIONS` describes all possible sections. Its format is
    ```
    {index: (url, name), ...}
    ```
    where:
    - `index` is the integer section index that is stored in the Xapian
      database,
    - `url` is the section URL that is equal to the directory path
      in the filesystem,
    - `name` is the human-readable name of the section that is returned
      to the frontend.

    Important:
    - Trailing "/" in the `url` is mandatory for proper operation of
    `from_url()` method.
    - `index` follows the convention that hundreds determine `DocModule` value.
    """
    SECTIONS = {
    # API
    1: ("/docs/api/qiskit/", "Qiskit SDK"),
    2: ("/docs/api/qiskit-ibm-runtime/", "Qiskit Runtime client"),
    3: ("/docs/api/qiskit-ibm-transpiler/", "Qiskit Transpiler Service client"),
    4: ("/docs/api/qiskit-addon-aqc-tensor/", "Approximate quantum compilation (AQC-Tensor)"),
    5: ("/docs/api/qiskit-addon-cutting/", "Circuit cutting"),
    6: ("/docs/api/qiskit-addon-mpf/", "Multi-product formulas (MPF)"),
    7: ("/docs/api/qiskit-addon-obp/", "Operator backpropagation (OBP)"),
    8: ("/docs/api/qiskit-addon-sqd/", "Sample-based quantum diagonalization (SQD)"),
    9: ("/docs/api/qiskit-addon-utils/", "Addon utilities"),
    10: ("/docs/api/qiskit-c/", "Qiskit SDK C API"),

    # Documentation
    100: ("/docs/guides/", "Guides"),

    # Tutorials
    200: ("/docs/tutorials/", "Tutorials"),

    # Learning
    300: ("/learning/courses/basics-of-quantum-information/", "Courses / Basics of quantum information"),
    301: ("/learning/courses/foundations-of-quantum-error-correction/", "Courses / Foundations of quantum error correction"),
    302: ("/learning/courses/fundamentals-of-quantum-algorithms/", "Courses / Fundamentals of quantum algorithms"),
    303: ("/learning/courses/general-formulation-of-quantum-information/", "Courses / General formulation of quantum information"),
    304: ("/learning/courses/quantum-business-foundations/", "Courses / Quantum business foundations"),
    305: ("/learning/courses/quantum-chem-with-vqe/", "Courses / Quantum chemistry with VQE"),
    306: ("/learning/courses/quantum-computing-in-practice/", "Courses / Quantum computing in practice"),
    307: ("/learning/courses/quantum-diagonalization-algorithms/", "Courses / Quantum diagonalization algorithms"),
    308: ("/learning/courses/quantum-machine-learning/", "Courses / Quantum machine learning"),
    309: ("/learning/courses/quantum-safe-cryptography/", "Courses / Practical introduction to quantum-safe cryptography"),
    310: ("/learning/courses/utility-scale-quantum-computing/", "Courses / Utility-scale quantum computing"),
    311: ("/learning/courses/variational-algorithm-design/", "Courses / Variational algorithm design"),
    312: ("/learning/modules/computer-science/", "Modules / Computer science"),
    313: ("/learning/modules/quantum-mechanics/", "Modules / Quantum mechanics"),
    }

    _url_regex = None
    _indeces = None

    @classmethod
    def from_url(cls, url: str):
        """Construct section corresponding to the given URL."""
        if cls._url_regex is None:
            urls = (f"({re.escape(sec[0])})" for sec in DocSection.SECTIONS.values())
            cls._url_regex = re.compile("|".join(urls))
            cls._indeces = tuple(cls.SECTIONS.keys())
        if not url.endswith("/"):
            url += "/"
        match = cls._url_regex.match(url)
        if match is None:
            raise ValueError(f"URL {url} does not correspond to any DocSection")
        index = cls._indeces[match.lastindex - 1]
        return DocSection(index)

    def __init__(self, index: int):
        """Construct section from the given index."""
        if index not in self.SECTIONS:
            raise ValueError(f"{index} is not a valid DocSection")
        self._index = index

    def __repr__(self) -> str:
        return f"<DocSection.{self.url}: {self.index}>"

    def __eq__(self, value) -> bool:
        return isinstance(value, DocSection) and self._index == value._index

    @property
    def index(self) -> int:
        """Get section index."""
        return self._index

    @property
    def url(self) -> str:
        """Get section URL."""
        return self.SECTIONS[self._index][0]

    @property
    def name(self) -> str:
        """Get section name (description)."""
        return self.SECTIONS[self._index][1]

    @property
    def module(self) -> DocModule:
        """Determine documentation module that corresponds to the section."""
        return DocModule(self._index // 100) # Use indexing convention


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
        self.section = DocSection.from_url(self.page_url)
        self.module = self.section.module
        # Determine version:
        if self.module == DocModule.API:
            chunks = self.page_url.split("/")
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
