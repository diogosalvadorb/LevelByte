# Level Byte
Projeto simplifica artigos e notícias de tecnologia, do português ou inglês, para um inglês mais fácil de entender. Cada texto é convertido em dois níveis: Básico e Avançado.
Ideal para quem quer aprender inglês técnico de forma prática. Aprenda tecnologia e inglês ao mesmo tempo.

🌐 **Acesse o projeto online:**  
👉 [https://level-byte.vercel.app/](https://level-byte.vercel.app/)

### ☁️ Publicação da Infraestrutura

- 🚀 **Back-End (.NET 9 API)** — publicado na [**Fly.io**](https://fly.io/)  
- 💻 **Front-End (Next.js 16)** — publicado na [**Vercel**](https://vercel.com/)  
- 🗄️ **Banco de Dados (PostgreSQL)** — hospedado na [**Neon**](https://neon.tech/)
- ⚙️ **CI/CD Automático** — implementado com [**GitHub Actions**](https://github.com/features/actions) para integração e deploy contínuo

## 📑 Índice

- [Funcionalidades](#Funcionalidades)
- [Pré-requisitos](#Pré-requisitos)
- [Como Instalar e Executar o Projeto](#Como-instalar-e-executar-o-projeto)
- [Serviços Externos](#Infraestrutura-e-Serviços)

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
    http://localhost:3000/Login: admin@levelsbyte.com
    Senha: Admin@123
   ```

### 🌍 Infraestrutura e Serviços

- 🚀 **[Fly.io](https://fly.io/)** — Hospedagem do **Back-End (.NET 9 API)**  
- 💻 **[Vercel](https://vercel.com/)** — Hospedagem do **Front-End (Next.js 16)**  
- 🗄️ **[Neon PostgreSQL](https://neon.tech/)** — Banco de dados PostgreSQL hospedado em nuvem  
- 🔊 **[OpenAI](https://platform.openai.com/docs/api-reference/introduction/)** — Geração de texto e áudio com IA  
- ☁️ **[Cloudflare Dashboard](https://developers.cloudflare.com/r2/)** — Armazenamento de áudios e imagens

