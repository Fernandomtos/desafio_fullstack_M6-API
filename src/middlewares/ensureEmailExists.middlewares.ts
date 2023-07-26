import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import AppError from "../error";
import { User } from "../entities/user.entity";

const ensureEmailExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const emailUser: string = req.body.email;

  if (!emailUser) {
    return next();
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findEmail: User | null = await userRepository.findOneBy({
    email: emailUser,
  });

  if (findEmail) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureEmailExistsMiddlewares;
