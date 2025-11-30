# Guia de Deploy - Backend Agenda Cultural

## Render

### 1. Criar conta no Render
- Acesse [render.com](https://render.com)
- Crie uma conta gratuita

### 2. Criar PostgreSQL Database
1. No dashboard, clique em "New +"
2. Selecione "PostgreSQL"
3. Configure:
   - Name: \`agenda-cultural-db\`
   - Database: \`agenda_cultural\`
   - User: (gerado automaticamente)
   - Region: escolha a mais próxima
4. Clique em "Create Database"
5. Copie a **Internal Database URL** (usaremos depois)

### 3. Criar Web Service
1. No dashboard, clique em "New +"
2. Selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - Name: \`agenda-cultural-api\`
   - Root Directory: \`backend\`
   - Environment: \`Node\`
   - Build Command: \`npm install && npx prisma generate && npx prisma migrate deploy\`
   - Start Command: \`npm start\`

### 4. Configurar Variáveis de Ambiente
Adicione as seguintes variáveis:
- \`DATABASE_URL\`: Cole a Internal Database URL do passo 2
- \`JWT_SECRET\`: Gere uma chave aleatória (ex: use um gerador online)
- \`PORT\`: \`3000\`

### 5. Deploy
- Clique em "Create Web Service"
- Aguarde o deploy (pode levar alguns minutos)
- Copie a URL da sua API (será algo como \`https://agenda-cultural-api.onrender.com\`)

### 6. Popular Banco de Dados
Acesse o terminal do Render e execute:
\`\`\`bash
npm run seed
\`\`\`

## Railway

### 1. Criar conta no Railway
- Acesse [railway.app](https://railway.app)
- Crie uma conta gratuita

### 2. Novo Projeto
1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Selecione seu repositório

### 3. Adicionar PostgreSQL
1. Clique em "+ New"
2. Selecione "Database" > "PostgreSQL"
3. Copie a DATABASE_URL gerada

### 4. Configurar Variáveis
No serviço do backend, adicione:
- \`DATABASE_URL\`
- \`JWT_SECRET\`
- \`PORT\`: \`3000\`

### 5. Configurar Deploy
- Root Directory: \`backend\`
- Build Command: \`npm install && npx prisma generate\`
- Start Command: \`npm start\`

## Supabase (Apenas Banco de Dados)

1. Crie projeto em [supabase.com](https://supabase.com)
2. Vá em Settings > Database
3. Copie a Connection String
4. Use em qualquer serviço de hospedagem Node.js

## Testando a API

Após deploy, teste:
\`\`\`bash
curl https://sua-api-url.com/api/health
\`\`\`

Deve retornar:
\`\`\`json
{"status": "ok", "message": "Agenda Cultural API is running"}
\`\`\`

## Atualizando a URL no Frontend

No frontend, atualize \`.env.local\`:
\`\`\`env
NEXT_PUBLIC_API_URL=https://sua-api-url.com/api
\`\`\`
