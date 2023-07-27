import { Repository } from "typeorm";
import { Contact } from "../../entities/contact.entity";
import { AppDataSource } from "../../data-source";

const listAllContactsService = async (): Promise<Contact[]> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contacts: Contact[] = await contactRepository.find({
    relations: {
      user: true,
    },
  });

  return contacts;
};

export default listAllContactsService;
