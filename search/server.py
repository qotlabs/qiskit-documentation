from search_data import SearchData
from return_data import ReturnData
from fastapi import FastAPI

app = FastAPI(
    title="Search Server"
)


@app.get("/api/search", response_model=ReturnData)
def search_query(query: str, module: str) -> ReturnData:
    search_data = SearchData(query, module).dict()
    return ReturnData(
        text=search_data['query'],
        id='1',
        url='https://docs.quantum.ibm.com/api/',
        pageTitle='Title',
        module=search_data['module'],
        section='section',
        title='title'
    )
