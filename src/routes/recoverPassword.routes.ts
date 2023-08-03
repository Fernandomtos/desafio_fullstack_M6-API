import { Router } from "express";
import recoverUserPasswordController from "../controllers/recoverPassword.controllers";
import ensureEmailExistsMiddlewares from "../middlewares/ensureEmailExists.middlewares";

const recoverPasswordRoutes: Router = Router();

recoverPasswordRoutes.post(
  "",
  ensureEmailExistsMiddlewares,
  recoverUserPasswordController
);

export default recoverPasswordRoutes;
