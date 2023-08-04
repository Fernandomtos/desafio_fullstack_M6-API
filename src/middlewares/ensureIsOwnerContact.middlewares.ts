import { NextFunction, Request, Response } from "express";
import AppError from "../error";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { AppDataSource } from "../data-source";

const ensureIsOwnerContactMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const contactId: number = parseInt(req.params.id);
  const userIdToken: number = parseInt(res.locals.userId);

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contactData: Contact | null = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      user: true,
    },
  });

  const userAdmin = res.locals.admin;

  const userIdContact = contactData?.user.id;

  if (userIdContact != userIdToken && userAdmin != true) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureIsOwnerContactMiddleware;
