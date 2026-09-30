from fastapi import APIRouter, Depends, status, Response
from uuid import uuid4

from app.api.deps import get_current_user_and_tenant
from app.schemas.misc import UserEventCreate
from app.db.session import get_session
from app.db.models import AuditLogModel

router = APIRouter()


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def create_events(
    payload: list[UserEventCreate],
    current_user: tuple[str, str] = Depends(get_current_user_and_tenant)
):
    midwife_id, tenant_id = current_user
    session = get_session()
    try:
        for event in payload:
            audit = AuditLogModel(
                id=str(uuid4()),
                tenant_id=tenant_id,
                actor_midwife_id=midwife_id,
                action=event.event_type,
                meta={"target": event.target},
                at=event.at
            )
            session.add(audit)
        session.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    finally:
        session.close()
