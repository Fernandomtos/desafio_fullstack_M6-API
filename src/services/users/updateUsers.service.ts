import { Repository } from "typeorm";
import {
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { userSchemaResponse } from "../../schemas/user.schema";
import { hash } from "bcryptjs";

const updateUsersService = async (
  userData: TUserUpdateRequest,
  userId: number
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (userData.password) {
    userData.password = await hash(userData.password, 10);
  }
  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const newUserData: User = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(newUserData);

  const returnUser: TUserResponse = userSchemaResponse.parse(newUserData);

  return returnUser;
};

export default updateUsersService;
