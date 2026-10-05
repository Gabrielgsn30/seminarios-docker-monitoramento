# 🐳 Aula 01: Introdução ao Docker e Comandos Básicos

Bem-vindo à primeira aula de Docker! O objetivo de hoje é entender o que são containers, como manipulá-los, gerenciar imagens, usar volumes para persistência e rodar aplicações reais (como um servidor web Nginx e um banco de dados MySQL) usando apenas comandos `docker run`.

---

## 📚 Referências Oficiais e de Apoio

* **Instalação:** [Docker Get Docker](https://docs.docker.com/get-docker/) — Guia oficial para instalar o Docker em diferentes sistemas operacionais.
* **Guias e Visão Geral:** [Docker Overview](https://docs.docker.com/get-started/overview/) — Explicação conceitual de como o Docker funciona por baixo dos panos.
* **Introdução Oficial:** [Docker Get Started](https://docs.docker.com/get-started/) — Tutoriais passo a passo da própria Docker.
* **Referência do `docker run`:** [Docker Run Command Reference](https://docs.docker.com/engine/reference/commandline/run/) — Documentação completa de todas as flags e parâmetros do comando mais usado no Docker.
* **Consulta Rápida de Comandos:** [Guia de Comandos Docker - Desenvolvedor Expert](https://stack.desenvolvedor.expert/appendix/docker/comandos.html) — Cola super útil para o dia a dia.

---

# 🚀 Roteiro de Comandos da Aula 01

### 1. Primeiros Passos e Imagens

* **`docker run hello-world`**
  * **O que acontece:** O Docker verifica se a imagem `hello-world` existe localmente. Como não encontra, ele faz o *download* (pull) do Docker Hub, cria um container, executa-o (imprimindo uma mensagem explicativa de que a instalação funcionou) e logo em seguida o container é encerrado. Serve para testar se o motor do Docker está rodando corretamente.

* **`docker pull ubuntu`**
  * **O que acontece:** Baixa a imagem oficial do sistema operacional Ubuntu (versão `latest`) do Docker Hub para o seu computador, mas **sem criar ou rodar nenhum container**. Útil para mostrar que imagens e containers são conceitos separados.

* **`docker image list`** (ou `docker images`)
  * **O que acontece:** Lista todas as imagens do Docker que estão armazenadas localmente na máquina, mostrando repositório, tag, ID, data de criação e tamanho.

---

### 2. Modos de Execução (Interativo vs. Background)

* **`docker run -it ubuntu /bin/bash`**
  * **O que acontece:**
    * `-i` (interactive): Mantém o STDIN aberto para você conseguir interagir.
    * `-t` (tty): Aloca um pseudo-terminal (te dá a tela preta com a linha de comando).
    * `ubuntu /bin/bash`: Roda o container baseado na imagem do Ubuntu e executa o interpretador de comandos Bash.
    * *Resultado:* Você "entra" dentro do container do Ubuntu. Para sair sem desligar, se sair usando `exit` o container após sair é encerrado.

* **`docker run -id ubuntu /bin/bash`**
  * **O que acontece:**
    * O `-d` (detached mode) faz o container rodar **em segundo plano** (background).
    * Combinado com `-i` e `-d`, ele mantém o container vivo rodando o Bash em background, mas devolve o seu terminal imediatamente para você continuar digitando comandos no seu computador real/host.

---

### 3. Gerenciamento de Containers

* **`docker ps`**
  * **O que acontece:** Lista apenas os **containers que estão rodando ativamente** no momento. Mostra o ID, a imagem usada, o comando, o tempo de vida (Uptime), as portas mapeadas e o nome.

* **`docker ps -a`** (all)
  * **O que acontece:** Lista **todos** os containers da máquina, tanto os que estão rodando quanto os que já foram parados/encerrados (como o `hello-world`). Fundamental para depuração.

* **`docker rm <container id>`**
  * **O que acontece:** Remove permanentemente um container parado do disco rígido, liberando espaço. *(Nota: Para apagar um container rodando, é preciso dar um `docker stop` antes ou usar a flag `-f` para forçar).*

---

### 4. Volumes (Persistência e Mapeamento de Pastas)

> *Explicação para os alunos:* O container é efêmero (volátil). Tudo o que é salvo dentro dele se perde quando ele é apagado. Os volumes servem para salvar dados no computador real (Host) ou em áreas seguras do Docker.

* **Abordagem A: Mapeando uma pasta do Host (Bind Mount)**
  * *Preparação:* Criar uma pasta local (`teste`) e um arquivo (`teste.txt`).
  * **`docker run -it -v //caminho/da/pasta:/etc/teste ubuntu`**
    * **O que acontece:** Mapeia o caminho da sua máquina (`//caminho/da/pasta`) diretamente para dentro do container no diretório `/etc/teste`. Se o aluno alterar um arquivo lá no container, a alteração reflete na pasta do computador (e vice-versa).

* **Abordagem B: Criando um Volume Gerenciado pelo Docker**
  * **`docker volume create teste`**
    * **O que acontece:** Cria um volume nomeado gerenciado pelo próprio Docker.
  * **`docker run -it -v teste:/teste ubuntu /bin/bash`**
    * **O que acontece:** Conecta o volume gerenciado chamado `teste` na pasta `/teste` de dentro do container interativo do Ubuntu. Os arquivos salvos ali sobrevivem mesmo se o container for deletado.

---

### 5. Portas (Exposição de Serviços)

* **`docker run -dp 80:80 docker/getting-started`**
  * **O que acontece:**
    * O `-d` roda o container em background.
    * O `-p 80:80` faz o **mapeamento de portas** (Port Forwarding): pega a porta `80` do seu computador físico (Host) e redireciona para a porta `80` de dentro do container.
    * *Resultado:* Ao abrir o navegador e digitar `http://localhost`, o aluno consegue acessar o aplicativo de boas-vindas do Docker.

---

### 6. Aplicações Práticas (Nginx e Banco de Dados)
*(O grande momento "uau!" da aula, aplicando volumes e portas em serviços reais)*

* **Exemplo A: Servidor Web Nginx com Mapeamento de Pasta (HTML)**
  * *Preparação:* Criar uma pasta para o site com um arquivo `index.html`.
  * **`docker run -d --name meu-web -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx`**
    * **O que acontece:**
      * `-d` roda o Nginx em background.
      * `--name meu-web` dá um nome amigável para o container.
      * `-p 8080:80` expõe o Nginx na porta `8080` do seu computador (acessível em `http://localhost:8080`).
      * `-v $(pwd):/usr/share/nginx/html` faz o bind mount da pasta atual do computador diretamente para a pasta pública onde o Nginx lê os arquivos HTML. Se o aluno editar o `index.html` na máquina dele, o site muda na hora no navegador!

* **Exemplo B: Banco de Dados MySQL com Persistência e Variáveis de Ambiente**
  * **`docker run -d --name meu-mysql -e MYSQL_ROOT_PASSWORD=senha123 -p 3306:3306 -v dados-mysql:/var/lib/mysql mysql:latest`**
    * **O que acontece:**
      * `--name meu-mysql` nomeia o container do banco.
      * `-e MYSQL_ROOT_PASSWORD=senha123` injeta uma **variável de ambiente** (`-e`) obrigatória para definir a senha de root do MySQL.
      * `-p 3306:3306` mapeia a porta padrão do MySQL para permitir conexões de ferramentas externas do computador (como DBeaver ou Workbench).
      * `-v dados-mysql:/var/lib/mysql` cria um volume gerenciado chamado `dados-mysql` atrelado à pasta interna onde o MySQL salva os arquivos dos bancos de dados. Se o container for apagado (`docker rm`), as tabelas e dados criados **não se perdem**, pois estão seguros no volume do Docker.