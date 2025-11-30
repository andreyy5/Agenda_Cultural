# Agenda Cultural - Apresentação Final TED 4

## Problema Comunitário Identificado

A falta de uma plataforma centralizada para divulgação de eventos culturais dificulta o acesso da comunidade a atividades artísticas e culturais locais. Organizadores têm dificuldade em alcançar seu público, e o público perde oportunidades de participar de eventos por falta de informação.

## Solução Desenvolvida

A **Agenda Cultural** é uma plataforma web full-stack que conecta organizadores de eventos culturais com o público interessado, oferecendo:

### Para a Comunidade
- Descoberta fácil de eventos culturais próximos
- Filtros por categoria, cidade e data
- Visualização detalhada com todas as informações necessárias
- Interface intuitiva e acessível

### Para Organizadores
- Cadastro simples de eventos
- Gestão completa de suas publicações
- Alcance ampliado para o público-alvo
- Plataforma gratuita e acessível

## Arquitetura da Solução

### Frontend (React.js + Next.js 16)
- Single Page Application (SPA) moderna e responsiva
- Componentização com React 19.2
- Gerenciamento de estado com Zustand
- Design system com Tailwind CSS v4 e Shadcn/ui
- Otimização de performance com App Router

### Backend (Node.js + Express)
- API RESTful robusta e escalável
- Autenticação segura com JWT
- Validação e tratamento de erros
- Arquitetura modular e manutenível

### Banco de Dados (PostgreSQL + Prisma)
- Modelagem relacional eficiente
- Migrations para controle de versão
- Type-safety com Prisma ORM
- Queries otimizadas

## Funcionalidades Implementadas

### Autenticação
- Registro de usuários com validação
- Login seguro com JWT
- Persistência de sessão
- Proteção de rotas

### Gestão de Eventos
- Criação com formulário completo
- Suporte a múltiplas categorias
- Upload de imagens via URL
- Edição e exclusão (com controle de permissões)

### Busca e Filtros
- Busca textual por título/descrição
- Filtro por categoria
- Filtro por cidade
- Listagem responsiva em grid

### Visualização
- Cards informativos com preview
- Página de detalhes completa
- Design atrativo e profissional
- Totalmente responsivo

## Tecnologias e Conceitos Aplicados

### React
- Hooks (useState, useEffect, useRouter)
- Componentes funcionais
- Context API (via Zustand)
- Client e Server Components
- Custom hooks

### Node.js & Express
- Rotas modulares
- Middlewares de autenticação
- CORS configurado
- Validação de dados
- Tratamento de erros

### Integração Frontend-Backend
- API client customizado
- Gerenciamento de tokens
- Interceptors de requisições
- Feedback visual de loading
- Tratamento de erros

### Boas Práticas
- Código limpo e organizado
- Componentização eficiente
- Tipagem com TypeScript
- Validação de formulários
- Segurança (hash de senhas, JWT)

## Impacto na Comunidade

### Benefícios Diretos
- Democratização do acesso à cultura
- Fortalecimento da cena cultural local
- Facilitação da divulgação para pequenos organizadores
- Criação de uma comunidade cultural ativa

### Métricas de Sucesso
- Número de eventos cadastrados
- Usuários registrados
- Interações na plataforma
- Feedback da comunidade

## Como Usar

### Para Visitantes
1. Acesse a plataforma
2. Navegue pelos eventos
3. Use filtros para encontrar eventos de interesse
4. Clique para ver detalhes completos

### Para Organizadores
1. Cadastre-se na plataforma
2. Faça login
3. Clique em "Criar Evento"
4. Preencha os dados e publique

## Deploy e Hospedagem

### Frontend
- Hospedado na Vercel
- Deploy automático via Git
- URL: [em produção]

### Backend
- Hospedado no Render
- Banco PostgreSQL gerenciado
- API URL: [em produção]

## Próximos Passos

### Melhorias Futuras
- Sistema de inscrições em eventos
- Notificações push
- Mapa interativo de eventos
- Integração com redes sociais
- Sistema de avaliações
- Dashboard administrativo
- Analytics de eventos

## Conclusão

A Agenda Cultural atende efetivamente ao problema identificado, oferecendo uma solução completa, moderna e escalável para conectar pessoas à cultura local. A aplicação demonstra domínio das tecnologias React e Node.js, aplicação correta de conceitos de desenvolvimento full-stack, e foco na experiência do usuário e na resolução de um problema real da comunidade.

---

**Desenvolvido por:** [Seus nomes]  
**Curso:** [Seu curso]  
**Instituição:** Universidade Brasil  
**Disciplina:** TED 4 Extensionista
