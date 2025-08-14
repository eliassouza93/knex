import { Request, Response, NextFunction } from 'express'

 
function validatePostTask(req: Request, res: Response, next: NextFunction) {
    const { name, task } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'O campo "name" é obrigatório e deve ser uma string.' })
    }
    if (!task || typeof task !== 'string') {
        return res.status(400).json({ message: 'O campo "task" é obrigatório e deve ser uma string.' })
    }

    next();
}

// Middleware para validar o corpo da requisição ao editar uma task
function validateEditTask(req: Request, res: Response, next: NextFunction) {
    const { task } = req.body;

    if (!task || typeof task !== 'string') {
        return res.status(400).json({ message: 'O campo "task" é obrigatório e deve ser uma string.' })
    }

    next();
}

// Exporta os middlewares em um objeto para facilitar a importação
export const middlewares = {
    validatePostTask,
    validateEditTask,
}
