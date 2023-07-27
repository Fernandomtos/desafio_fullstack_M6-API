import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { TUserContactResponse } from "../../interfaces/users.interfaces";
import { userSchemaResponseContacts } from "../../schemas/user.schema";

const retrieveContactsUserService = async (
  userId: number
): Promise<TUserContactResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  const returnUser: TUserContactResponse =
    userSchemaResponseContacts.parse(user);

  return returnUser;
};

export default retrieveContactsUserService;
