from fastapi import APIRouter, Depends

from app.api.deps import get_current_user_and_tenant
from app.schemas.misc import ClinicConfig

router = APIRouter()


@router.get("", response_model=ClinicConfig)
def get_config(current_user: tuple[str, str] = Depends(get_current_user_and_tenant)):
    midwife_id, tenant_id = current_user
    return ClinicConfig()
