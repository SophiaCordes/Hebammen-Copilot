from pydantic_settings import BaseSettings
from pydantic import field_validator, model_validator, ConfigDict


class Settings(BaseSettings):
    ENV: str = "dev"
    DATABASE_URL: str = "postgresql+psycopg2://midwife:change-me@localhost:5432/midwife"
    ALLOW_SQLITE_FALLBACK: bool = True
    SQLITE_DATABASE_URL: str = "sqlite:///./midwife.db"
    JWT_SECRET: str = "change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    CORS_ORIGINS: list[str] = ["*"]
    
    # SQLAlchemy connection pool configuration
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10
    DB_POOL_RECYCLE: int = 1800
    DB_POOL_PRE_PING: bool = True

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: any) -> list[str]:
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    @model_validator(mode="after")
    def validate_prod_settings(self) -> "Settings":
        if self.ENV == "prod":
            if self.ALLOW_SQLITE_FALLBACK:
                self.ALLOW_SQLITE_FALLBACK = False
            if self.DATABASE_URL.startswith("sqlite"):
                raise ValueError("SQLite DATABASE_URL is not allowed in production environment.")
        return self

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


settings = Settings()
