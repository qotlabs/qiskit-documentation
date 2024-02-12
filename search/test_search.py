from search_data import SearchData
from return_data import ReturnData
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['get'],
    allow_headers=['Content-Type'],
)


@app.get("/api/search")
def search_query(query: str, module: str) -> ReturnData:
    search_data = SearchData(query=query, module=module).dict()
    return ReturnData(
        text=search_data['query'],
        id='1',
        url='https://docs.quantum.ibm.com/api/',
        pageTitle='Title',
        module=search_data['module'],
        section='section',
        title='title'
    )
