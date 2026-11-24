from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "VELORA API"
    DATABASE_URL: str = "sqlite:///./velora_dev.db"
    SECRET_KEY: str = "velora-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    ADMIN_DEFAULT_USERNAME: str = "admin"
    ADMIN_DEFAULT_EMAIL: str = "admin@veloradining.com"
    ADMIN_DEFAULT_PASSWORD: str = "ChangeMe123!"

    CORS_ORIGINS: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.CORS_ORIGINS.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()