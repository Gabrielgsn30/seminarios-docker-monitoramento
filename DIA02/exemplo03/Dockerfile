# Usamos uma imagem base leve do Alpine Linux falaremos mais sobre imagens ao longo do dia, onde estão como funcionam e como são geradas
FROM alpine:latest

# Copia o arquivo local 'mensagem.txt' para dentro da pasta raiz '/' do container
ADD mensagem.txt /app/mensagem.txt

WORKDIR /app

# Lista os arquivos ao rodar
CMD ["ls", "-la"]