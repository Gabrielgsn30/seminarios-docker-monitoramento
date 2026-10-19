FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

RUN apt-get update
RUN apt-get install -y --no-install-recommends

# install requirements
RUN pip3 install fastapi[all] uvicorn[standard]

# 
COPY ./fastapi_crud /app


ENV PYTHONPATH "${PYTHONPATH}:/app"

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
