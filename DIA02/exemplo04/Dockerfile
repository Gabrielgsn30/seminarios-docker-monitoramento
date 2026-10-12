# Usa a imagem oficial do Nginx como base (super leve)
FROM nginx:alpine

# Copia o arquivo index.html do seu computador para dentro do container
# O Nginx procura os arquivos para exibir justamente nessa pasta destino
COPY index.html /usr/share/nginx/html/index.html

# Expõe a porta 80 (padrão do protocolo HTTP)
EXPOSE 80