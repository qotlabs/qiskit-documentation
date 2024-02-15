# SPDX-License-Identifier: Apache-2.0
# SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
# SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>
# SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>

import logging
import xapian
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from enum import Enum
from pathlib import Path
from database import Database
from document import DocModule

DOCUMENTATION_HOST = "http://127.0.0.1:3000"
DATABASE_PATH = "./index"
ALLOW_ORIGINS = [
    DOCUMENTATION_HOST,
    "http://localhost:3000",
]


class Module(Enum):
    DOCUMENTATION = "documentation"
    API = "api"


class Result(BaseModel):
    text: str
    id: str
    url: HttpUrl
    pageTitle: str
    module: Module
    section: str
    title: str


db = Database(Path(DATABASE_PATH))
app = FastAPI(
    title="Search Server"
)
logger = logging.getLogger("uvicorn.error")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_methods=["get"],
    allow_headers=["Content-Type"],
)


@app.get("/api/search")
def search(
    response: Response,
    query: str,
    module: Module,
    version: float = 0,
    offset: int = 0,
) -> list[Result]:
    docs = []
    try:
        docs = db.search(
            query,
            module=DocModule.from_str(module.value),
            version=version,
            offset=offset,
        )
    except xapian.InvalidArgumentError as e:
        logger.error(e)
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return []

    reply = []
    for doc in docs:
        reply.append(Result(
            text=doc.text,
            id=f"docs_{doc.docid}",
            url=DOCUMENTATION_HOST + doc.url,
            pageTitle=doc.page_title,
            module=module,
            section=str(doc.section),
            title=doc.title,
        ))
    return reply
