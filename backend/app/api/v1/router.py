from fastapi import APIRouter

from app.api.v1.areas.auth.routes import router as auth_router
from app.api.v1.areas.me.routes import router as me_router
from app.api.v1.areas.events.routes import router as events_router
from app.api.v1.areas.config.routes import router as config_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(me_router, prefix="", tags=["Auth"])
api_router.include_router(events_router, prefix="/events", tags=["Telemetry"])
api_router.include_router(config_router, prefix="/config", tags=["Reference"])
