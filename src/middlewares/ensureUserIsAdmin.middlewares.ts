import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const ensureUserIsAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userAdmin = res.locals.admin;

  if (userAdmin != "admin") {
    throw new AppError("Insufficient permission", 403);
  }

  
  return next();
};

export default ensureUserIsAdminMiddleware;
