import TUserEmailData from "../../interfaces/recoverPassword.interfaces";
import nodemailer from "nodemailer";
import crypto from "crypto";
import updateUsersService from "../users/updateUsers.service";
import { TUserUpdateRequest } from "../../interfaces/users.interfaces";
import AppError from "../../error";

const recoverPasswordService = async (
  userEmail: TUserEmailData,
  userId: number,
  userAdmin: string
): Promise<void> => {

  // CONFIGURAÇÃO PARA MAILTRAP
  // const transport = nodemailer.createTransport({
  //   host: "smtp.sendgrid.net",
  //   port: 587,
  //   auth: {
  //     user: "19fb67f0acc908",
  //     pass: "a0c52b0192dfb4",
  //   },
  // });

  //CONFIGURAÇÃO PARA GMAIL

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emailapiprojecttest@gmail.com',
      pass: 'gbvxagpnqrqgnxxc',
    },
  });

  transport.verify()
    .then(console.log)
    .catch(() => {
      throw new AppError("Fail to send mail", 404);
    });

  const newPassword = crypto.randomBytes(4).toString("hex");

  transport
    .sendMail({
      // from: "Adminstrador <7aa89a43bc-1cb999@inbox.mailtrap.io>",
      from: "Adminstrador <emailapiprojecttest@gmail.com>",
      to: userEmail.email,
      subject: "Recuperação de senha",
      html: `<p>Olá, segue senha de recuperação: ${newPassword}</p><br/><a href="http://localhost:3000/login">Página Login</a>`,
    })
    .then(async () => {
      const passwordData = {
        password: newPassword,
      };

      const userData: TUserUpdateRequest = passwordData;

      updateUsersService(userData, userId, userAdmin);
    })
    .catch(() => {
      throw new AppError("Fail to send mail", 404);
    });

  return;
};

export default recoverPasswordService;
