from pydantic import BaseModel, Field, validator

class SearchData(BaseModel):
    query: str = Field(min_length=1)
    module: str = Field(min_length=1)

    @validator('module')
    def check_module(cls, v):
        if v.strip() not in ('documentation', 'api'):
            raise ValueError('module must be "documentation" or "api"')
        return v.strip()
