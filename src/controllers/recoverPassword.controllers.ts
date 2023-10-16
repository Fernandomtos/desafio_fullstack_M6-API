import { Request, Response } from "express";
import TUserEmailData from "../interfaces/recoverPassword.interfaces";
import recoverPasswordService from "../services/recoverPass/recoverPassword.service";

const recoverPasswordController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userEmail: TUserEmailData = req.body;
  const userId: number = parseInt(res.locals.id);
  const userAdmin = res.locals.admin;

  await recoverPasswordService(userEmail, userId, userAdmin);

  return res.status(200).json("Email sended");
};

export default recoverPasswordController;
