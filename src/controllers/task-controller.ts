import { knex } from "@/database";
import { NextFunction, Request, Response } from "express";
import crypto from "node:crypto";

export default class TaskController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await knex("task").select("*");
      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pegaTarefaPorId = await knex("task").where({ id }).first();

      if (!pegaTarefaPorId) {
        return res.status(404).json({ message: "ID incorreto!" });
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
        return res
          .status(400)
          .json({ message: "Campos name e task são obrigatórios" });
      }

      const id = crypto.randomUUID();

      const [insertInfo] = await knex("task")
        .insert({ id, name, task })
        .returning("*");

      return res.status(201).json(insertInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async editarTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { task, name } = req.body;

      if (!task && !name) {
        return res.status(400).json({ message: "Nova task é obrigatória" });
      }

      const updateData: any = {};
      if (task) updateData.task = task;
      if (name) updateData.name = name;

      const [updateTask] = await knex("task")
        .where({ id })
        .update(updateData)
        .returning("*");

      if (!updateTask) {
        return res.status(404).json({ message: "tarefa não encontrada" });
      }

      return res.status(200).json(updateTask);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async deletarTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletarDados = await knex("task").where({ id }).del();

      if (deletarDados === 0) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      return res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
