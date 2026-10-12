# Usamos uma imagem base leve do Alpine Linux falaremos mais sobre imagens ao longo do dia, onde estão como funcionam e como são geradas
FROM alpine:latest

# Copia o arquivo local 'mensagem.txt' para dentro da pasta raiz '/' do container
COPY mensagem.txt /mensagem.txt

# Comando executado ao iniciar o container: lê o arquivo na tela após isso encerra o container.
CMD ["cat", "/mensagem.txt"]