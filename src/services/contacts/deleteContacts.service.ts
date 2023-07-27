import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const deleteContactsService = async (userId: number): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contactRemove: Contact | null = await contactRepository.findOneBy({
    id: userId,
  });

  if (contactRemove) {
    await contactRepository.delete(contactRemove.id);
  }

  return;
};

export default deleteContactsService;
