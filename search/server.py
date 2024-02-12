from fastapi import FastAPI
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["get"],
    allow_headers=["Content-Type"],
)


@app.get("/api/search")
def search(
    query: str,
    module: Module,
    version: float = 0
) -> list[Result]:
    reply = []
    query = f"version:{version} AND module:{DocModule.from_str(module.value).value} AND \"{query}\""
    for doc in db.search(query):
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
