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

#EXAMPLES

import { knex } from '@/database';
import { NextFunction, Request, Response } from 'express';
import crypto from 'node:crypto';

export default class TaskController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await knex('task').select('*');
            return res.status(200).json(task);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async buscarPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const pegaTarefaPorId = await knex('task')
                .where({ id })
                .first();

            if (!pegaTarefaPorId) {
                return res.status(404).json({ message: 'ID incorreto!' });
            }

            return res.status(200).json(pegaTarefaPorId);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async postarTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, task } = req.body;

            if (!name || !task) {
                return res.status(400).json({ message: 'Campos name e task são obrigatórios' });
            }

            const id = crypto.randomUUID();

            const [insertInfo] = await knex('task')
                .insert({ id, name, task })
                .returning('*');

            return res.status(201).json(insertInfo);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async editarTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { task } = req.body;

            if (!task) {
                return res.status(400).json({ message: 'Nova task é obrigatória' });
            }

            const updated = await knex('task')
                .where({ id })
                .update({ task });

            if (updated === 0) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }

            const updatedTask = await knex('task')
                .where({ id })
                .first();

            return res.status(200).json(updatedTask);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async deletarTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const deletarDados = await knex('task')
                .where({ id })
                .del();

            if (deletarDados === 0) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }

            return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}
