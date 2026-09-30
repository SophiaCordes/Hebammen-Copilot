from datetime import datetime
from fastapi import APIRouter, Depends

from app.api.deps import get_current_user_and_tenant
from app.schemas.auth import User, MeUpdate


router = APIRouter()


@router.get("/me", response_model=User)
def get_me(current_user: tuple[str, str] = Depends(get_current_user_and_tenant)):
    midwife_id, tenant_id = current_user
    return User(
        id=midwife_id,
        short_id="demo",
        display_name="Demo User",
        role="midwife",
        language_pref="de",
        notice_acked_at=datetime(2026, 2, 10, 8, 0, 0)
    )


@router.patch("/me", response_model=User)
def update_me(payload: MeUpdate, current_user: tuple[str, str] = Depends(get_current_user_and_tenant)):
    midwife_id, tenant_id = current_user
    lang = payload.language_pref or "de"
    name = payload.display_name or "Demo User"
    return User(
        id=midwife_id,
        short_id="demo",
        display_name=name,
        role="midwife",
        language_pref=lang,
        notice_acked_at=datetime(2026, 2, 10, 8, 0, 0)
    )


@router.post("/me/notice-ack")
def ack_notice(current_user: tuple[str, str] = Depends(get_current_user_and_tenant)):
    return {"noticeAckedAt": datetime.utcnow().isoformat() + "Z"}
