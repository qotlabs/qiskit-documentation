# SPDX-License-Identifier: Apache-2.0
# SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
# SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>
# SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>

import logging
import xapian
import config
from fastapi import FastAPI, Response, Header, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from enum import Enum
from pathlib import Path
from database import Database
from document import DocModule

class DocModuleStr(Enum):
    """Documentation module with string values."""

    DOCUMENTATION = "documentation"
    API = "api"


class Result(BaseModel):
    """Result object that is returned by the server."""

    text: str
    id: str
    url: HttpUrl
    pageTitle: str
    module: DocModuleStr
    section: str
    title: str


db = Database(Path(config.DATABASE_PATH))
app = FastAPI(
    title="Search Server"
)
logger = logging.getLogger("uvicorn.error")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOW_ORIGINS,
    allow_methods=["get"],
    allow_headers=["Content-Type"],
)


@app.get("/api/search")
def search(
    response: Response,
    if_none_match: str | None = Header(default=None),
    module: DocModuleStr = Query(default=...),
    query: str = Query(default=..., min_length=1, max_length=1000),
    version: float = Query(default=0, strict=True, ge=0, multiple_of=0.01),
    offset: int = Query(default=0, strict=True, ge=0),
) -> list[Result]:
    if if_none_match == db.etag:
        response.status_code = status.HTTP_304_NOT_MODIFIED
        return response

    response.headers.append("Cache-Control", config.CACHE_CONTROL)
    response.headers.append("ETag", db.etag)

    search = lambda: db.search(
        query,
        module=DocModule.from_str(module.value),
        version=version,
        offset=offset,
    )
    try:
        docs = search()
    except xapian.DatabaseModifiedError as e:
        logger.warning(e)
        db.reopen()
        docs = search()
    except xapian.InvalidArgumentError as e:
        logger.error(e)
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return []

    reply = []
    for doc in docs:
        reply.append(Result(
            text=doc.text,
            id=f"docs_{doc.docid}",
            url=config.DOCUMENTATION_HOST + doc.url,
            pageTitle=doc.page_title,
            module=module,
            section=str(doc.section),
            title=doc.title,
        ))
    return reply
