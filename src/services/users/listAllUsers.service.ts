import { Repository } from "typeorm";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";
import { usersSchemaResponse } from "../../schemas/user.schema";

const listAllUsersService = async (): Promise<TUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] | undefined = await userRepository.find({
    withDeleted: true,
  });

  if (!users) {
    throw new AppError("User not found", 404);
  }

  const returnUsers: TUsersResponse = usersSchemaResponse.parse(users);

  return returnUsers;
};

export default listAllUsersService;
