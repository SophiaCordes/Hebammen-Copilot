from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("", response_model=list[dict])
def list_midwives(tenant_id: str):
    return [
        {
            "id": "midwife-001",
            "tenant_id": tenant_id,
            "display_name": "Demo User",
            "email": "demo@example.com",
            "role": "midwife",
            "status": "active",
        }
    ]


@router.post("", status_code=201, response_model=dict)
def create_midwife(tenant_id: str):
    if tenant_id != "demo-tenant":
        raise HTTPException(status_code=404, detail="Tenant not found")
    return {
        "id": "midwife-002",
        "tenant_id": tenant_id,
        "display_name": "New Midwife",
        "email": "new@example.com",
        "role": "midwife",
        "status": "active",
    }
