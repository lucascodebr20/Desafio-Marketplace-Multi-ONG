# 🏪 Marketplace Multi-ONG - Desafio Full Stack

## 1. Visão Geral

Este projeto é um marketplace **multi-tenant** que conecta consumidores com **ONGs parceiras**.  
Cada ONG gerencia seus produtos em uma área restrita, enquanto os consumidores podem navegar, buscar e realizar pedidos em um portal público que consolida todos os itens.

A aplicação foi desenvolvida com foco em uma **arquitetura robusta, segura e fácil de implantar**, utilizando **Docker** para encapsular os serviços e simplificar o setup do ambiente de desenvolvimento.

---

## 2. 🧰 Tecnologias Utilizadas

- **Backend:** Java com Spring Boot  
- **Frontend:** *(Especifique aqui, ex: React, Vue, Angular)*  
- **Banco de Dados:** PostgreSQL  
- **Containerização:** Docker e Docker Compose  
- **Autenticação:** JWT (JSON Web Tokens)  
- **IA para Busca:** Google Gemini API  

---

## 3. 🚀 Guia de Instalação com Docker Compose

Siga os passos abaixo para clonar, configurar e executar a aplicação completa localmente.

### 3.1. Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados e em execução.  
- [Git](https://git-scm.com/) para clonar o repositório.  
- Uma **Chave de API do Google Gemini**, que pode ser obtida gratuitamente no [Google AI Studio](https://aistudio.google.com/app/apikey).  

---

### 3.2. Passos para Execução

#### **1️⃣ Clonar o Repositório**

git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_DIRETORIO>


### 3.3. Crie um arquivo .env

# sudo nano .env

# Chave secreta para a geração e validação de tokens JWT.
# Use uma string longa e aleatória (ex: pode ser gerada com um gerador de senhas).
JWT_SECRET_KEY=sua_chave_secreta_super_longa_e_segura_aqui

# Configurações do Banco de Dados PostgreSQL (usadas pelo Docker Compose)
DB_NAME=marketplace_db
DB_USERNAME=admin
DB_PASSWORD=supersecretpassword

# Chave de API para o serviço de busca inteligente do Google Gemini
SECRET_API_GEMINI=sua_chave_de_api_do_gemini_aqui


Subir os Containers

Com o Docker em execução, utilize o Docker Compose para construir as imagens e iniciar todos os serviços (backend, frontend e banco de dados):

docker-compose up --build
