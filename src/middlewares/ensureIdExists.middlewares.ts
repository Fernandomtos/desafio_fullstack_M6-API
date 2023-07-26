import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import AppError from "../error";
import { User } from "../entities/user.entity";

const ensureIdExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userIdParams: number = parseInt(req.params.id);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOneBy({
    id: userIdParams,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default ensureIdExistsMiddlewares;
