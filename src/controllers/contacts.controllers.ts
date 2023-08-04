import { Request, Response } from "express";
import {
  TContactRequest,
  TContactUpdateRequest,
} from "../interfaces/contacts.interfaces";
import createContactsService from "../services/contacts/createContacts.service";
import listAllContactsService from "../services/contacts/listAllContacts.service";
import { Contact } from "../entities/contact.entity";
import retrieveContactsUserService from "../services/contacts/retrieveContactsUser.service";
import deleteContactsService from "../services/contacts/deleteContacts.service";
import updateContactsService from "../services/contacts/updateContacts.service";

const createContactsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData: TContactRequest = req.body;
  const userId: number = parseInt(res.locals.userId);

  const newContact: Contact = await createContactsService(contactData, userId);

  return res.status(201).json({ message: "Contact created" });
};

const listAllContactsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contacts: Contact[] = await listAllContactsService();

  return res.status(200).json(contacts);
};

const retrieveContactsUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const userContacts = await retrieveContactsUserService(userId);

  return res.status(200).json(userContacts);
};

const deleteContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await deleteContactsService(userId);

  return res.status(204).send();
};

const updateContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData: TContactUpdateRequest = req.body;
  const contactId: number = parseInt(req.params.id);

  const updateUser = await updateContactsService(contactData, contactId);

  return res.status(200).json(updateUser);
};

export {
  createContactsControllers,
  listAllContactsControllers,
  retrieveContactsUserControllers,
  deleteContactsController,
  updateContactsController,
};
