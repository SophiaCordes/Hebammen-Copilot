from app.schemas.base import BaseSchema


class TenantRead(BaseSchema):
    id: str
    name: str
    slug: str
    status: str
