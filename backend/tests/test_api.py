from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def get_headers():
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "demo@example.com", "password": "change-me"}
    )
    assert response.status_code == 200
    token = response.json()["accessToken"]
    return {"Authorization": f"Bearer {token}"}


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ready"


def test_readiness_check():
    response = client.get("/health/ready")
    assert response.status_code == 200
    assert response.json()["status"] == "ready"


def test_liveness_check():
    response = client.get("/health/live")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_reference_config():
    headers = get_headers()
    config_resp = client.get("/api/v1/config", headers=headers)
    assert config_resp.status_code == 200
