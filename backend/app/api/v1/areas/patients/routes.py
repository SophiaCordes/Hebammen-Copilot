from fastapi import APIRouter

router = APIRouter()


@router.get("", response_model=list[dict])
def list_patients(tenant_id: str):
    return [
        {
            "id": "patient-001",
            "tenant_id": tenant_id,
            "display_name": "Demo Patient A",
            "dob": "1990-01-01",
            "source": "manual",
        }
    ]


@router.post("", status_code=201, response_model=dict)
def create_patient(tenant_id: str):
    return {
        "id": "patient-002",
        "tenant_id": tenant_id,
        "display_name": "Demo Patient B",
        "dob": "1992-02-02",
        "source": "manual",
    }
