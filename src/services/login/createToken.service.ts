import { Repository } from "typeorm";
import { IToken, TLoginRequest } from "../../interfaces/login.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";

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
      name: user.name,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  const userData: TUserResponse = userSchemaResponse.parse(user);

  return { userData, token };
};

export default createTokenService;
