from pydantic import BaseModel, Field, HttpUrl

class ReturnData(BaseModel):
    text: str = Field(min_length=1)
    id: str = Field(min_length=1)
    url: HttpUrl
    pageTitle: str = Field(min_length=1)
    module: str = Field(min_length=1)
    section: str = Field(min_length=1)
    title: str = Field(min_length=1)
