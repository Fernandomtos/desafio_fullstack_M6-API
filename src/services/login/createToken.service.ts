import { Repository } from "typeorm";
import { IToken, TLoginRequest } from "../../interfaces/login.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

const createTokenService = async (
  loginData: TLoginRequest
): Promise<IToken> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
  });

  if (!user || user.deletedAt != null) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch: boolean = await compare(
    loginData.password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return { token };
};

export default createTokenService;
