from datetime import datetime
from app.schemas.base import BaseSchema


class PatientCreate(BaseSchema):
    first_name: str
    last_name: str
    external_ref: str
    dob: datetime | None = None


class PatientSummary(BaseSchema):
    id: str
    external_ref: str
    display_name: str
