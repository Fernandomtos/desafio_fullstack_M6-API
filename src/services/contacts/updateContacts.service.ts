import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  TContactResponse,
  TContactUpdateRequest,
} from "../../interfaces/contacts.interfaces";
import { Contact } from "../../entities/contact.entity";
import AppError from "../../error";

const updateContactsService = async (
  contactData: TContactUpdateRequest,
  contactId: number
): Promise<TContactResponse> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const oldContactData: Contact | null = await contactRepository.findOneBy({
    id: contactId,
  });

  if (!oldContactData) {
    throw new AppError("Contact not found", 404);
  }

  const newContactData: Contact = contactRepository.create({
    ...oldContactData,
    ...contactData,
  });

  await contactRepository.save(newContactData);

  const returnContact: TContactResponse = newContactData;

  return returnContact;
};

export default updateContactsService;
