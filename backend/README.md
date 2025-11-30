# 📅 Agenda Cultural - Backend API

API REST para gerenciamento de eventos culturais, desenvolvida com Node.js, Express e Prisma.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

## ⚙️ Configuração

### 1. Instalar dependências

\`\`\`bash
npm install
\`\`\`

### 2. Configurar banco de dados

Crie um arquivo `.env` baseado no `.env.example`:

\`\`\`env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agenda_cultural"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
\`\`\`

### 3. Executar migrações

\`\`\`bash
npx prisma migrate dev
\`\`\`

### 4. Iniciar servidor

\`\`\`bash
npm run dev
\`\`\`

O servidor estará disponível em `http://localhost:3000`

## 📌 Endpoints

### Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Usuários

- `GET /api/users` - Listar usuários (Admin)
- `GET /api/users/:id` - Buscar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário (Admin)

### Cidades

- `GET /api/cities` - Listar cidades
- `GET /api/cities/:id` - Buscar cidade
- `POST /api/cities` - Criar cidade (Admin)
- `PUT /api/cities/:id` - Atualizar cidade (Admin)
- `DELETE /api/cities/:id` - Deletar cidade (Admin)

### Eventos

- `GET /api/events` - Listar eventos (com filtros)
- `GET /api/events/:id` - Buscar evento
- `POST /api/events` - Criar evento (Autenticado)
- `PUT /api/events/:id` - Atualizar evento (Dono/Admin)
- `DELETE /api/events/:id` - Deletar evento (Dono/Admin)

## 🔒 Autenticação

A API utiliza JWT para autenticação. Inclua o token no header:

\`\`\`
Authorization: Bearer {seu_token}
\`\`\`

## 📚 Documentação Postman

[Ver documentação completa](https://documenter.getpostman.com/view/49870231/2sB3WsR18b)
