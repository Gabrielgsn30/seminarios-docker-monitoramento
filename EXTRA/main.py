from fastapi import FastAPI

from core.configs import settings
from api.v1.api import api_router

from prometheus_fastapi_instrumentator import (
    Instrumentator,
    metrics,
)

app = FastAPI(title='Curso API - Segurança')
app.include_router(api_router, prefix=settings.API_V1_STR)


if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000,
                log_level='info', reload=True)


@app.on_event("startup")
async def startup():
            instrumentator = Instrumentator(
                should_group_status_codes=False,
                should_ignore_untemplated=True,
                should_respect_env_var=False,
                should_instrument_requests_inprogress=True,
                excluded_handlers=None,
                inprogress_name="http_requests_inprogress",
                inprogress_labels=True,
            )
            instrumentator.add(
                metrics.request_size(
                    metric_name="http_request_size_bytes",
                    should_include_handler=True,
                    should_include_method=True,
                    should_include_status=True,
                )
            ).add(
                metrics.response_size(
                    metric_name="http_response_size_bytes",
                    should_include_handler=True,
                    should_include_method=True,
                    should_include_status=True,
                )
            ).add(
                metrics.requests(
                    metric_name="http_requests_total",
                    should_include_handler=True,
                    should_include_method=True,
                    should_include_status=True,
                )
            ).add(
                metrics.latency(
                    metric_name="http_request_duration_seconds",
                    should_include_handler=True,
                    should_include_method=True,
                    should_include_status=True,
                )
            )
            instrumentator.instrument(app).expose(
                app, include_in_schema=False, should_gzip=True
            )
"""
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjU2NTkxNDQyLCJpYXQiOjE2NTU5ODY2NDIsInN1YiI6IjEifQ.Ez6BNcflgBWxjOgUD8_Q2BvqopsZdR6nkGYVBTI_Jpw
Tipo: bearer

"""
