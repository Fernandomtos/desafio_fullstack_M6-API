import TUserEmailData from "../../interfaces/recoverPassword.interfaces";
import nodemailer from "nodemailer";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { getRepository } from "typeorm";
import updateUsersService from "../users/updateUsers.service";
import { TUserUpdateRequest } from "../../interfaces/users.interfaces";
import AppError from "../../error";

const recoverPasswordService = async (
  userEmail: TUserEmailData,
  userId: number
): Promise<void> => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "19fb67f0acc908",
      pass: "a0c52b0192dfb4",
    },
  });

  const newPassword = crypto.randomBytes(4).toString("hex");

  transport
    .sendMail({
      from: "Adminstrador <7aa89a43bc-1cb999@inbox.mailtrap.io>",
      to: userEmail.email,
      subject: "Recuperação de senha",
      html: `<p>Olá, segue senha de recuperação: ${newPassword}</p><br/><a href="http://localhost:3000/login">Página Login</a>`,
    })
    .then(async () => {
      const passwordData = {
        password: newPassword,
      };

      const userData: TUserUpdateRequest = passwordData;

      updateUsersService(userData, userId);
    })
    .catch(() => {
      throw new AppError("Fail to send mail", 404);
    });

  return;
};

export default recoverPasswordService;
