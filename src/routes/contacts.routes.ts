import { Router } from "express";
import {
  createContactsControllers,
  deleteContactsController,
  listAllContactsControllers,
  retrieveContactsUserControllers,
} from "../controllers/contacts.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import ensureIsOwnerMiddleware from "../middlewares/ensureIsOwner.middlewares";

const contactRoutes: Router = Router();

contactRoutes.post("", ensureTokenIsValidMiddleware, createContactsControllers);

contactRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listAllContactsControllers
);

contactRoutes.get(
  "/users/:id",
  ensureTokenIsValidMiddleware,
  ensureIsOwnerMiddleware,
  retrieveContactsUserControllers
);

contactRoutes.delete("/:id", deleteContactsController);

export default contactRoutes;
