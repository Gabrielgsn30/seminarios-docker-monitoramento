FROM postgres:15-alpine
ENV POSTGRES_DB=escola_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret
COPY init.sql /docker-entrypoint-initdb.d/