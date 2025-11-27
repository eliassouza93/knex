import TaskController from "@/controllers/task-controller";
import { Router } from "express";

const routerTask = Router();
const taskController = new TaskController();

routerTask.get("/", taskController.index);
routerTask.post("/", taskController.postarTask);
routerTask.put("/:id", taskController.editarTask);
routerTask.delete("/:id", taskController.deletarTask);
routerTask.get("/:id", taskController.buscarPorId);

export { routerTask };
