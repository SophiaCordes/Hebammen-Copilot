import base64
import json
from fastapi import Header, HTTPException, status


def get_current_user_and_tenant(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or expired access token.",
        )
    token = authorization.split(" ")[1]
    try:
        # Base64 decode mock JWT
        missing_padding = len(token) % 4
        if missing_padding:
            token += '=' * (4 - missing_padding)
        data = json.loads(base64.b64decode(token).decode('utf-8'))
        return data["midwife_id"], data["tenant_id"]
    except Exception:
        # Fallback for mock testing
        if token == "mock-access-token":
            return "3f6a1c2e-8b21-4d9a-9f7e-1c2d3e4f5a6b", "demo-tenant"
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or expired access token.",
        )
