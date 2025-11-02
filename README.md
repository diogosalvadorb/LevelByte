# Level Byte
Projeto simplifica artigos e notícias de tecnologia, do português ou inglês, para um inglês mais fácil de entender. Cada texto é convertido em dois níveis: Básico e Avançado.
Ideal para quem quer aprender inglês técnico de forma prática. Aprenda tecnologia e inglês ao mesmo tempo.

🌐 **Acesse o projeto online:**  
👉 <a href="https://level-byte.vercel.app/" target="_blank">https://level-byte.vercel.app/</a>

### ☁️ Publicação da Infraestrutura

- 🚀 **Back-End (.NET 8 API)** — publicado na <a href="https://fly.io/" target="_blank">**Fly.io**</a>  
- 💻 **Front-End (Next.js 16)** — publicado na <a href="https://vercel.com/" target="_blank">**Vercel**</a>  
- 🗄️ **Banco de Dados (PostgreSQL)** — hospedado na <a href="https://neon.tech/" target="_blank">**Neon**</a>  
- ⚙️ **CI/CD Automático** — implementado com <a href="https://github.com/features/actions" target="_blank">**GitHub Actions**</a>

## 📑 Índice

- [Funcionalidades](#️-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Como Instalar e Executar o Projeto](#-como-instalar-e-executar-o-projeto)
- [Infraestrutura e Serviços](#-infraestrutura-e-serviços)


## ⚙️ Funcionalidades

- **Gerenciamento de artigos (criação, edição e exclusão)**
- **Dois níveis de complexidade: Básico e Avançado**
- **Player de áudio integrado para ouvir os artigos**
- **Geração automática de áudio com IA (OpenAI)**
- **Upload e gerenciamento de imagens e áudios com Cloudflare**
- **Busca de artigos por título ou conteúdo**
- **Autenticação JWT para administradores**
- **Dashboard administrativo para gestão de conteúdo**

## 🧩 Pré-requisitos

Antes de executar o projeto, você precisará ter instalado em seu ambiente:

- **.NET 9.0 SDK**
- **SQL PostGres**
- **Git** (para clonar o repositório)
- **Node.js 22.18**
- **NPM 10.9.3**
- **Conta OpenAI - para geração de texto e áudio**
- **Conta Cloudflare - para armazenamento de áudio e imagens**
- Um cliente de API como o **Postman** ou **Insomnia** (opcional, para testar os endpoints)

  ## 🚀 Como Instalar e Executar o Projeto

  ** 🖥️ Back-End**

1. Clone o repositório:
   ```bash
   git clone https://github.com/diogosalvadorb/LevelByte.git

2. Entre no diretório do Back-End do projeto:
   ```bash
   cd backend
   ```
   
3. Configure a string de conexão com o banco de dados no arquivo appsettings.json:
   ```bash
   "ConnectionStrings": {
    "Neon": "Server=SERVIDOR; Database=LevelByte; Username:Username, Password:Password"
   }

4. Configure as credenciais da OpenAI e Cloudflare::
   ```bash
   "OpenAi": {
      "ApiKey": "sua-chave-openai"
    },
      "CloudflareR2": {
      "AccountId": "seu-account-id",
      "AccessKeyId": "sua-access-key",
      "SecretAccessKey": "sua-secret-key",
      "Bucket": "seu-bucket"
    }

   ```

5. Restaure as dependências::
   ```bash
   dotnet restore
   ```

6. Crie o banco de dados: 
   ```bash
   dotnet ef database update
   ```

7. Execute o projeto:
   ```bash
   dotnet run --project LendByte.Api
   ```
   
O projeto estará disponível em:
   ```bash
   http://localhost:5050
   ```

 ## 💻 Front-End  

 
1. Entre no diretório do front-end:
   ```bash
   cd frontend/levelbyte-front
   ```
   
2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie o arquivo .env.local:
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5050
    NEXTAUTH_SECRET=sua-chave-secreta
    NEXTAUTH_URL=http://localhost:3000

    ```

4. Execute o projeto:
    ```bash
    npm run dev
    ```
    
Acesse a aplicação em
    ```bash
    http://localhost:3000/
     ```
🔐 Credenciais de Acesso Administrativo
   ```bash
    localhohttp://localhost:3000/login
    Login: admin@levelsbyte.com
    Senha: Admin@123
   ```

### 🌍 Infraestrutura e Serviços

- 🚀 **Back-End (.NET 8 API)** — publicado na <a href="https://fly.io/" target="_blank">**Fly.io**</a>  
- 💻 **Front-End (Next.js 16)** — publicado na <a href="https://vercel.com/" target="_blank">**Vercel**</a>  
- 🗄️ **Banco de Dados (PostgreSQL)** — hospedado na <a href="https://neon.tech/" target="_blank">**Neon**</a>  
- 🔊 **OpenAI** — <a href="https://platform.openai.com/docs/api-reference/introduction/" target="_blank">Geração de texto e áudio com IA</a>  
- ☁️ **Cloudflare R2** — <a href="https://developers.cloudflare.com/r2/" target="_blank">Armazenamento de áudios e imagens</a>
- 🔁 **CI/CD Automático** — configurado com <a href="https://github.com/features/actions" target="_blank">**GitHub Actions**</a> 

