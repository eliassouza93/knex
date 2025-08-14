# knex
# Task API

Uma API simples de gerenciamento de tarefas construída com **Node.js**, **Express** e **Knex.js** conectada a um banco de dados SQL.

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Knex.js](https://knexjs.org/)
- Banco de dados: PostgreSQL, SQLite ou MySQL (configurável)
- TypeScript

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo

# Instale as dependências
npm install

# Configure o banco de dados no arquivo /src/database/knexfile.ts (ou .js)

# Rode as migrações para criar a tabela
npx knex migrate:latest

# Inicie o servidor
npm run dev
