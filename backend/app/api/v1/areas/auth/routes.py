import base64
import json
from datetime import datetime
from fastapi import APIRouter, HTTPException, status, Response

from app.schemas.auth import LoginRequest, LoginResponse, RefreshRequest, TokenResponse, User


router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    if payload.email != "demo@example.com" or payload.password != "change-me":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email or password is incorrect."
        )
    
    # Generate mock base64 token
    token_data = {"midwife_id": "3f6a1c2e-8b21-4d9a-9f7e-1c2d3e4f5a6b", "tenant_id": "demo-tenant"}
    token_str = base64.b64encode(json.dumps(token_data).encode("utf-8")).decode("utf-8")
    
    user = User(
        id="3f6a1c2e-8b21-4d9a-9f7e-1c2d3e4f5a6b",
        short_id="demo",
        display_name="Demo User",
        role="midwife",
        language_pref="de",
        notice_acked_at=datetime(2026, 2, 10, 8, 0, 0)
    )
    
    return LoginResponse(
        access_token=token_str,
        refresh_token="rt_mock_refresh_token_12345",
        expires_in=900,
        user=user
    )


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout():
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/refresh", response_model=TokenResponse)
def refresh_token(payload: RefreshRequest):
    if not payload.refresh_token.startswith("rt_"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please log in again."
        )
    # Re-generate access token
    token_data = {"midwife_id": "3f6a1c2e-8b21-4d9a-9f7e-1c2d3e4f5a6b", "tenant_id": "demo-tenant"}
    token_str = base64.b64encode(json.dumps(token_data).encode("utf-8")).decode("utf-8")
    
    return TokenResponse(
        access_token=token_str,
        refresh_token="rt_mock_refresh_token_rotated",
        expires_in=900
    )
