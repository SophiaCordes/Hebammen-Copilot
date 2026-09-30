# Midwife App Backend

This backend provides a FastAPI-based API foundation for the Midwife App workflow, with auth, config and event endpoints. Tenant, midwife and patient route stubs exist but are not mounted.

## Current capabilities

- FastAPI application with Swagger UI and ReDoc
- Versioned API routes under /api/v1
- Health check endpoint at /health
- Pydantic schemas for request and response validation
- Service-layer business logic for core domain flows
- SQLAlchemy ORM foundation with a PostgreSQL-first configuration
- Database scripts and schema definitions under the db folder
- Pytest-based smoke tests

## First-time setup

From the backend folder:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

If PowerShell blocks script execution, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Database setup

The backend is configured to use PostgreSQL by default. The recommended local workflow is Docker Compose, which spins up a Postgres instance automatically.

### Option 1: Docker Compose (recommended)

```powershell
docker compose up --build
```

The API will connect to:

- Host: localhost
- Port: 5432
- Database: midwife
- User: midwife
- Password: change-me

### Option 2: Local PostgreSQL instance

If you already have Postgres running locally, set the connection string explicitly:

```powershell
$env:DATABASE_URL = "postgresql+psycopg2://midwife:change-me@localhost:5432/midwife"
```

### Fallback behavior

If no reachable Postgres server is available, the app can fall back to a local SQLite database for development convenience. This is controlled by the environment variable ALLOW_SQLITE_FALLBACK.

## Run the API locally

```powershell
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Open the API docs at:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Run with Docker Compose

From the backend folder:

```powershell
docker compose up --build
```

Then open:

- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs

To stop the containers:

```powershell
docker compose down
```

## Example endpoints

- GET /health
- POST /api/v1/auth/login
- GET /api/v1/config

## Architecture overview

### High-level design

The backend is structured as a modular FastAPI service with clear domain boundaries:

- API layer: handles HTTP requests and route orchestration
- Schemas layer: defines Pydantic models for validation and OpenAPI generation
- Service layer: encapsulates business logic for each domain area
- Persistence layer: uses SQLAlchemy ORM models and PostgreSQL-compatible tables
- Deployment model: containerized for local development and future cloud deployment

### Current implementation layout

- app/main.py: application entrypoint and middleware configuration
- app/api/v1/router.py: central router for versioned API areas
- app/api/v1/areas/<area>/routes.py: route definitions for each business domain
- app/services/: business logic for core flows
- app/db/: SQLAlchemy models, session management, and initialization
- db/: schema scripts for persistence setup
- tests/: smoke tests

## Testing

Run the test suite with:

```powershell
pytest tests -q
```
