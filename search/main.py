from urllib import parse
from search_data import SearchData
from return_data import ReturnData
from fastapi import FastAPI

app = FastAPI(
    title="Search Server"
)


@app.get("/search", response_model=ReturnData)
def search_query(query: str, module: str) -> ReturnData:
    decoded_query = parse.unquote_plus(parse.unquote(query))
    decoded_module = parse.unquote_plus(parse.unquote(module))
    search_data = SearchData(query=decoded_query, module=decoded_module).dict()
    return ReturnData(
        text=search_data['query'],
        id='1',
        url='https://docs.quantum.ibm.com/api/',
        pageTitle='Title',
        module=search_data['module'],
        section='section',
        title='module'
    )
