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
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import ensureIsOwnerMiddleware from "../middlewares/ensureIsOwner.middlewares";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddlewares(userSchemaRequest),
  ensureEmailExistsMiddlewares,
  createUsersController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listUsersController
);

userRoutes.get(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureIdExistsMiddlewares,
  ensureIsOwnerMiddleware,
  retrieveUsersController
);

userRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureIdExistsMiddlewares,
  ensureDataIsValidMiddlewares(userSchemaUpdateRequest),
  ensureIsOwnerMiddleware,
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureIdExistsMiddlewares,
  ensureIsOwnerMiddleware,
  deleteUsersController
);

userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware,
  ensureIdExistsMiddlewares,
  ensureUserIsAdminMiddleware,
  recoverUsersController
);

export default userRoutes;
