FROM postgres:15-alpine

# Variáveis de ambiente padrão para criar o banco de dados
ENV POSTGRES_DB=escola_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret

# Copia o script SQL para a pasta especial do PostgreSQL.
# Tudo nessa pasta é executado automaticamente na criação do banco!
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432