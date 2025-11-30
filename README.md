# Agenda Cultural - Plataforma Full-Stack de Eventos Culturais

Plataforma completa para divulgação e descoberta de eventos culturais, desenvolvida com React.js no frontend e Node.js no backend. Projeto desenvolvido para o TED 4 Extensionista.

## Visão Geral

A **Agenda Cultural** é uma solução que conecta organizadores de eventos culturais com o público, facilitando a divulgação e descoberta de atividades artísticas e culturais nas comunidades locais. A plataforma oferece uma interface intuitiva para criar, visualizar e gerenciar eventos de diversas categorias como música, teatro, cinema, literatura e muito mais.

## Tecnologias Utilizadas

### Frontend
- **Next.js 16** - Framework React com App Router
- **React 19.2** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização moderna e responsiva
- **Zustand** - Gerenciamento de estado global
- **Shadcn/ui** - Componentes de UI acessíveis
- **date-fns** - Manipulação de datas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Criptografia de senhas

## Funcionalidades

### Para Usuários
- Navegação por eventos culturais
- Filtros por categoria, cidade e busca textual
- Visualização detalhada de eventos
- Sistema de autenticação seguro
- Criação e gerenciamento de eventos próprios

### Para Organizadores
- Cadastro de eventos com informações completas
- Upload de imagens (via URL)
- Gestão de capacidade e preços
- Edição e exclusão de eventos criados

### Categorias Suportadas
- Música
- Teatro
- Artes Visuais
- Cinema
- Literatura
- Festival
- Dança
- Gastronomia

## Instalação e Configuração

### Pré-requisitos
- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

### 1. Clonar o Repositório

\`\`\`bash
git clone <url-do-repositorio>
cd agenda-cultural
\`\`\`

### 2. Configurar Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Crie um arquivo \`.env\` dentro do backend baseado em: 
DATABASE_URL="postgresql://postgres:stahl2402@localhost:5432/agendaCultural?schema=public"
JWT_SECRET=chavesecreta123

\`\`\`env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agenda_cultural?schema=public"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
PORT=3000
\`\`\`

Execute as migrações do banco de dados:

\`\`\`bash
npx prisma migrate dev
\`\`\`

Inicie o servidor backend:

\`\`\`bash
npm run dev
\`\`\`

O backend estará disponível em \`http://localhost:3000\`

### 3. Configurar Frontend

Em outra janela do terminal:

\`\`\`bash
# Volte para a raiz do projeto
cd ..
npm install
\`\`\`

Crie um arquivo \`.env.local\` baseado no \`.env.local.example\`:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

Inicie o servidor de desenvolvimento:

\`\`\`bash
npm run dev
\`\`\`

A aplicação estará disponível em \`http://localhost:3001\`

## Estrutura do Projeto

\`\`\`
agenda-cultural/
├── backend/                    # API Node.js + Express
│   ├── prisma/                # Schema e migrações do banco
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/           # Configurações (Prisma)
│   │   ├── middleware/       # Autenticação e validação
│   │   ├── routes/           # Rotas da API
│   │   └── server.js         # Servidor Express
│   ├── .env.example
│   └── package.json
│
├── app/                       # Frontend Next.js
│   ├── eventos/              # Páginas de eventos
│   ├── cidades/              # Página de cidades
│   ├── criar-evento/         # Formulário de criação
│   ├── login/                # Página de login
│   ├── registro/             # Página de registro
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página inicial
│   └── globals.css           # Estilos globais
│
├── components/                # Componentes React
│   ├── ui/                   # Componentes base (shadcn)
│   ├── event-card.tsx        # Card de evento
│   ├── event-details.tsx     # Detalhes do evento
│   ├── event-form.tsx        # Formulário de evento
│   ├── event-filters.tsx     # Filtros de busca
│   ├── events-grid.tsx       # Grade de eventos
│   ├── hero.tsx              # Seção hero
│   ├── navbar.tsx            # Barra de navegação
│   ├── login-form.tsx        # Formulário de login
│   └── register-form.tsx     # Formulário de registro
│
├── lib/                       # Utilitários e lógica
│   ├── api.ts                # Cliente da API
│   ├── store.ts              # Estado global (Zustand)
│   └── utils.ts              # Funções auxiliares
│
└── README.md
\`\`\`

## API Endpoints

### Autenticação
- \`POST /api/auth/register\` - Registrar novo usuário
- \`POST /api/auth/login\` - Fazer login

### Eventos
- \`GET /api/events\` - Listar eventos (com filtros opcionais)
- \`GET /api/events/:id\` - Buscar evento específico
- \`POST /api/events\` - Criar evento (autenticado)
- \`PUT /api/events/:id\` - Atualizar evento (dono/admin)
- \`DELETE /api/events/:id\` - Deletar evento (dono/admin)

### Cidades
- \`GET /api/cities\` - Listar todas as cidades
- \`GET /api/cities/:id\` - Buscar cidade específica
- \`POST /api/cities\` - Criar cidade (admin)
- \`PUT /api/cities/:id\` - Atualizar cidade (admin)
- \`DELETE /api/cities/:id\` - Deletar cidade (admin)

### Usuários
- \`GET /api/users\` - Listar usuários (admin)
- \`GET /api/users/:id\` - Buscar usuário
- \`PUT /api/users/:id\` - Atualizar usuário
- \`DELETE /api/users/:id\` - Deletar usuário (admin)

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após login ou registro, inclua o token no header das requisições:

\`\`\`
Authorization: Bearer {seu_token_jwt}
\`\`\`

## Testes

Use a coleção do Postman para testar os endpoints da API:

[Documentação Postman](https://documenter.getpostman.com/view/49870231/2sB3WsR18b)
