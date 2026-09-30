from datetime import datetime
from app.schemas.base import BaseSchema


class ClinicConfig(BaseSchema):
    rooms: list[str] = ["Room 1", "Room 2", "Room 3"]
    session_idle_logout_min: int = 30
    language_default: str = "de"


class UserEventCreate(BaseSchema):
    event_type: str
    target: str
    at: datetime
