import { Request, Response } from "express";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/users.interfaces";
import createUsersService from "../services/users/createUsers.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import retrieveUsersService from "../services/users/retrieveUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import softDeleteUsersService from "../services/users/softDeleteUsers.service";
import recoverUsersService from "../services/users/recoverUsers.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listAllUsersService();

  return res.status(200).json(users);
};

const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const user: TUserResponse = await retrieveUsersService(userId);

  return res.json(user);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserUpdateRequest = req.body;
  const userId: number = parseInt(req.params.id);

  const updateUser = await updateUsersService(userData, userId);

  return res.status(200).json(updateUser);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await softDeleteUsersService(userId);

  return res.status(204).send();
};

const recoverUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const activeUser = await recoverUsersService(userId);

  return res.status(200).json(activeUser);
};

export {
  createUsersController,
  listUsersController,
  retrieveUsersController,
  updateUsersController,
  deleteUsersController,
  recoverUsersController,
};
