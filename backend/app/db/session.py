from __future__ import annotations

import os
from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings
from app.db.base import Base

_engine = None
_SessionLocal = None


def configure_database(database_url: str | None = None) -> None:
    global _engine, _SessionLocal
    database_url = database_url or settings.DATABASE_URL

    try:
        _engine = _create_engine(database_url)
        _SessionLocal = sessionmaker(bind=_engine, autoflush=False, autocommit=False)
        if settings.ENV != "prod":
            Base.metadata.create_all(_engine)
    except OperationalError:
        if database_url.startswith("postgresql") and settings.ALLOW_SQLITE_FALLBACK:
            sqlite_url = settings.SQLITE_DATABASE_URL
            _engine = _create_engine(sqlite_url)
            _SessionLocal = sessionmaker(bind=_engine, autoflush=False, autocommit=False)
            if settings.ENV != "prod":
                Base.metadata.create_all(_engine)
        else:
            raise


def _create_engine(database_url: str):
    if database_url.startswith("sqlite"):
        return create_engine(database_url, connect_args={"check_same_thread": False})
    return create_engine(
        database_url,
        pool_size=settings.DB_POOL_SIZE,
        max_overflow=settings.DB_MAX_OVERFLOW,
        pool_recycle=settings.DB_POOL_RECYCLE,
        pool_pre_ping=settings.DB_POOL_PRE_PING,
    )


def init_db() -> None:
    if _engine is None:
        configure_database()
    if settings.ENV != "prod":
        Base.metadata.create_all(_engine)


def get_db() -> Iterator[Session]:
    if _SessionLocal is None:
        configure_database()
    session = _SessionLocal()
    try:
        yield session
    finally:
        session.close()


def get_session() -> Session:
    if _SessionLocal is None:
        configure_database()
    return _SessionLocal()
