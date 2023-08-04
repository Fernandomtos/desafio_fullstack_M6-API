import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
  contactsSchemaResponse,
} from "../schemas/contact.schema";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TContactsResponse = z.infer<typeof contactsSchemaResponse>;
type TContactUpdateRequest = DeepPartial<TContactRequest>;
type TContactResponse = z.infer<typeof contactSchemaResponse>;

export {
  TContact,
  TContactRequest,
  TContactsResponse,
  TContactUpdateRequest,
  TContactResponse,
};
