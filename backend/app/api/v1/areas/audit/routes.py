from fastapi import APIRouter

router = APIRouter()


@router.get("", response_model=list[dict])
def list_audit_events(tenant_id: str):
    return [
        {
            "id": "audit-001",
            "tenant_id": tenant_id,
            "event_type": "case_created",
            "actor": "midwife-001",
            "created_at": "2026-07-16T08:00:00Z",
        }
    ]
