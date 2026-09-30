from fastapi import APIRouter

from app.schemas.tenants import TenantRead
from app.services.tenants import TenantService

router = APIRouter()
service = TenantService()


@router.get("", response_model=list[TenantRead])
def list_tenants():
    return service.list_tenants()


@router.get("/{tenant_id}", response_model=TenantRead)
def get_tenant(tenant_id: str):
    tenant = service.list_tenants()[0]
    return TenantRead(**{**tenant.model_dump(), "id": tenant_id})
