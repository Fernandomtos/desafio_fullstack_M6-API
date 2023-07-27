import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  contactSchema,
  contactSchemaRequest,
  contactsSchemaResponse,
} from "../schemas/contact.schema";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TContactsResponse = z.infer<typeof contactsSchemaResponse>;
type TContactUpdateRequest = DeepPartial<TContactRequest>;

export { TContact, TContactRequest, TContactsResponse, TContactUpdateRequest };
