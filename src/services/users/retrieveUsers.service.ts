import { Repository } from "typeorm";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { userSchemaResponse } from "../../schemas/user.schema";

const retrieveUsersService = async (userId: number): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const returnUser = userSchemaResponse.parse(user);

  return returnUser;
};

export default retrieveUsersService;
