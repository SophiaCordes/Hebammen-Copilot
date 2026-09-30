from dataclasses import dataclass

from app.schemas.tenants import TenantRead


@dataclass
class TenantService:
    def list_tenants(self) -> list[TenantRead]:
        return [
            TenantRead(
                id="demo-tenant",
                name="Midwife App Demo Clinic",
                slug="demo-clinic",
                status="active",
            )
        ]
