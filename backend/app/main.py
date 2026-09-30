from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import setup_logging, StructuredLoggingMiddleware
from app.db.session import get_db

# Initialize structured logging
setup_logging()

app = FastAPI(
    title="Midwife App API",
    version="0.1.0",
    description="Enterprise-ready base API areas for the midwife workflow backend.",
)

# Logging middleware executes first in the Starlette stack (wraps other middlewares)
app.add_middleware(StructuredLoggingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
@app.get("/health/ready")
def readiness_check(db: Session = Depends(get_db)):
    """Readiness probe checking database connectivity."""
    try:
        # Execute a simple query to check connection
        db.execute(text("SELECT 1"))
        return {"status": "ready", "service": "midwife-app-backend"}
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database connection failed: {str(e)}"
        )


@app.get("/health/live")
def liveness_check():
    """Liveness probe verifying that the API is up and running."""
    return {"status": "ok", "service": "midwife-app-backend"}
