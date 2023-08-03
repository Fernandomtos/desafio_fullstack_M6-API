import { z } from "zod";
import { contactsSchemaResponse } from "./contact.schema";

const userSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45),
  email: z.string().email().max(60),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  fone: z.string().max(20),
  createdAt: z.string(),
  deletedAt: z.date().nullish(),
});

const userSchemaRequest = userSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
});

const userSchemaResponse = userSchema.omit({ password: true });

const usersSchemaResponse = z.array(userSchemaResponse);

const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
  admin: true,
});

const userEmailSchema = userLoginSchema.pick({
  email: true,
});

const userSchemaUpdateRequest = userSchemaRequest
  .partial()
  .omit({ admin: true });

const userSchemaResponseContacts = userSchemaResponse
  .omit({
    admin: true,
    createdAt: true,
    deletedAt: true,
  })
  .extend({
    contacts: contactsSchemaResponse,
  });

export {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userLoginSchema,
  usersSchemaResponse,
  userSchemaUpdateRequest,
  userSchemaResponseContacts,
  userEmailSchema,
};
