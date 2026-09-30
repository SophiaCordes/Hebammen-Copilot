import json
import logging
import time
from datetime import datetime, timezone
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.core.config import settings

# Get a logger for this module
logger = logging.getLogger("app.api")


class JsonFormatter(logging.Formatter):
    """
    Custom logging formatter that outputs JSON log lines.
    """
    def format(self, record: logging.LogRecord) -> str:
        # Convert timestamp to ISO format with Z suffix
        log_time = datetime.fromtimestamp(record.created, tz=timezone.utc).isoformat().replace("+00:00", "Z")
        
        # Build log payload as JSON
        log_payload = {
            "severity": record.levelname,
            "time": log_time,
            "message": record.getMessage(),
            "source": {
                "file": record.pathname,
                "line": record.lineno,
                "function": record.funcName,
            }
        }
        
        # Add custom attributes if they are present on the record
        reserved_attrs = {
            "args", "asctime", "created", "exc_info", "exc_text", "filename",
            "funcName", "levelname", "levelno", "lineno", "module",
            "msecs", "message", "msg", "name", "pathname", "process",
            "processName", "relativeCreated", "stack_info", "thread", "threadName"
        }
        for key, val in record.__dict__.items():
            if key not in reserved_attrs:
                log_payload[key] = val
                
        # Include traceback details if an exception occurred
        if record.exc_info:
            log_payload["exception"] = self.formatException(record.exc_info)
            
        return json.dumps(log_payload)


def setup_logging() -> None:
    """
    Sets up python root logging configuration. In 'prod' environment, logs are written
    in structured JSON to stdout. In other environments, standard human-readable stream logs are used.
    """
    root_logger = logging.getLogger()
    
    # Clear any pre-existing default handlers
    for handler in list(root_logger.handlers):
        root_logger.removeHandler(handler)
        
    handler = logging.StreamHandler()
    
    if settings.ENV == "prod":
        handler.setFormatter(JsonFormatter())
        root_logger.setLevel(logging.INFO)
    else:
        # standard development formatter
        formatter = logging.Formatter(
            "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
        )
        handler.setFormatter(formatter)
        root_logger.setLevel(logging.DEBUG if settings.ENV == "dev" else logging.INFO)
        
    root_logger.addHandler(handler)
    
    # Route third-party web server logs to the root handler
    for log_name in ["uvicorn", "uvicorn.access", "uvicorn.error", "fastapi"]:
        l = logging.getLogger(log_name)
        l.handlers = []
        l.propagate = True


class StructuredLoggingMiddleware(BaseHTTPMiddleware):
    """
    FastAPI HTTP middleware logging request details, durations, and exceptions.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        start_time = time.perf_counter()
        
        # Log incoming request
        logger.info(
            f"Incoming request {request.method} {request.url.path}",
            extra={
                "http_method": request.method,
                "path": request.url.path,
                "client_ip": request.client.host if request.client else None,
            }
        )
        
        try:
            response = await call_next(request)
            process_time = time.perf_counter() - start_time
            
            # Log completed response
            logger.info(
                f"Completed request {request.method} {request.url.path} with status {response.status_code} in {process_time:.4f}s",
                extra={
                    "http_method": request.method,
                    "path": request.url.path,
                    "status_code": response.status_code,
                    "duration_s": process_time,
                }
            )
            return response
        except Exception as exc:
            process_time = time.perf_counter() - start_time
            logger.exception(
                f"Unhandled exception during {request.method} {request.url.path} in {process_time:.4f}s: {str(exc)}",
                extra={
                    "http_method": request.method,
                    "path": request.url.path,
                    "duration_s": process_time,
                }
            )
            raise exc from None
