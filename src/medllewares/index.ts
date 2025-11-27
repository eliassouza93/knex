import { Request, Response, NextFunction } from "express";

function validatePostTask(req: Request, res: Response, next: NextFunction) {
  const { login, password } = req.body;

  if (!login || typeof login !== "string") {
    return res
      .status(400)
      .json({
        message: 'O campo "login" é obrigatório e deve ser uma string.',
      });
  }

  if (!password || typeof password !== "string") {
    return res
      .status(400)
      .json({
        message: 'O campo "password" é obrigatório e deve ser uma string.',
      });
  }

  next();
}

function validateEditTask(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;

  if (!password || typeof password !== "string") {
    return res
      .status(400)
      .json({
        message: 'O campo "password" é obrigatório e deve ser uma string.',
      });
  }

  next();
}

// Exporta os middlewares em um objeto para facilitar a importação //

export const middlewares = {
  validatePostTask,
  validateEditTask,
};
