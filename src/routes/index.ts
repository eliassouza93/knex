import { Router } from "express";
import { routerTask } from "./task-routes";

const router = Router()

router.use(routerTask)

export { router }