import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  listUsersController,
  recoverUsersController,
  retrieveUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddlewares from "../middlewares/ensureDataIsValid.middlewares";
import {
  userSchemaRequest,
  userSchemaUpdateRequest,
} from "../schemas/user.schema";
import ensureIdExistsMiddlewares from "../middlewares/ensureIdExists.middlewares";
import ensureEmailExistsMiddlewares from "../middlewares/ensureEmailExists.middlewares";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddlewares(userSchemaRequest),
  ensureEmailExistsMiddlewares,
  createUsersController
);

userRoutes.get("", listUsersController);

userRoutes.get("/:id", ensureIdExistsMiddlewares, retrieveUsersController);

userRoutes.patch(
  "/:id",
  ensureIdExistsMiddlewares,
  ensureDataIsValidMiddlewares(userSchemaUpdateRequest),
  updateUsersController
);

userRoutes.delete("/:id", ensureIdExistsMiddlewares, deleteUsersController);

userRoutes.put(
  "/:id/recover",
  ensureIdExistsMiddlewares,
  recoverUsersController
);

export default userRoutes;
