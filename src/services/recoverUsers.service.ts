import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { TUserResponse, TUsersResponse } from "../interfaces/users.interfaces";
import {
  userSchemaResponse,
  usersSchemaResponse,
} from "../schemas/user.schema";

const recoverUsersService = async (userId: number): Promise<TUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userActive: User[] | null = await userRepository.find({
    where: {
      id: userId,
    },
    withDeleted: true,
  });

  console.log(userActive);
  if (userActive) {
    await userRepository.recover(userActive);
  }

  const returnUser: TUsersResponse = usersSchemaResponse.parse(userActive);

  return returnUser;
};

export default recoverUsersService;
