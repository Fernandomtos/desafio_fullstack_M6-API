import { Repository } from "typeorm";
import { Contact } from "../../entities/contact.entity";
import { TContactRequest } from "../../interfaces/contacts.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const createContactsService = async (
  contactData: TContactRequest,
  userId: number
): Promise<Contact> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const user: User | null = await userRepository.findOneBy({ id: userId });

  const contact: Contact = contactRepository.create({
    ...contactData,
    user: user!,
  });

  await contactRepository.save(contact);

  return contact;
};

export default createContactsService;
