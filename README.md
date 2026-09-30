# Midwife App — Base Scaffold

Early scaffold of a web application for midwives, developed as part of a
university-funded research project. It contains the project's base structure:
a React Native / Expo frontend and a FastAPI backend.

> **Status: archival snapshot, not a working product.**
> This is an early, partial snapshot of the codebase. Domain-specific
> features, data models and integrations are not included. The code is
> provided as-is for reference and is not maintained.

## Contents

```
backend/    FastAPI service: auth, config and event endpoints; unmounted stubs for tenants/patients
frontend/   Expo / React Native app: auth flows, navigation, UI components, theming
```

## Running locally

Backend:

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
ALLOW_SQLITE_FALLBACK=true uvicorn app.main:app --reload
pytest -q
```

Frontend:

```bash
cd frontend
npm install
npm run web
```

All credentials in this repository (`change-me`, `demo@example.com`) are
placeholders for local development only.

## License

Licensed under the MIT License. See [LICENSE](LICENSE) and
[NOTICE](NOTICE).

`frontend/LICENSE` is the MIT license of the Expo project template the
frontend was generated from, retained as that license requires.
