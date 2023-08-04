import { Router } from "express";
import {
  createContactsControllers,
  deleteContactsController,
  listAllContactsControllers,
  retrieveContactsUserControllers,
  updateContactsController,
} from "../controllers/contacts.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import ensureIsOwnerMiddleware from "../middlewares/ensureIsOwner.middlewares";
import ensureIdExistsMiddlewares from "../middlewares/ensureIdExists.middlewares";
import ensureDataIsValidMiddlewares from "../middlewares/ensureDataIsValid.middlewares";
import { contactSchemaUpdateRequest } from "../schemas/contact.schema";
import ensureIsOwnerContactMiddleware from "../middlewares/ensureIsOwnerContact.middlewares";

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

contactRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddlewares(contactSchemaUpdateRequest),
  ensureIsOwnerContactMiddleware,
  updateContactsController
);

export default contactRoutes;
