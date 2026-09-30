from datetime import datetime
from app.schemas.base import BaseSchema


class User(BaseSchema):
    id: str
    short_id: str
    display_name: str
    role: str
    language_pref: str
    notice_acked_at: datetime | None = None


class LoginRequest(BaseSchema):
    email: str
    password: str


class LoginResponse(BaseSchema):
    access_token: str
    refresh_token: str
    expires_in: int = 900
    user: User


class RefreshRequest(BaseSchema):
    refresh_token: str


class TokenResponse(BaseSchema):
    access_token: str
    refresh_token: str | None = None
    expires_in: int = 900


class MeUpdate(BaseSchema):
    language_pref: str | None = None
    display_name: str | None = None
