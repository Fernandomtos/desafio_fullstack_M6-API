import { z } from "zod";

const contactSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45),
  email: z.string().email().max(60),
  fone: z.string().max(20),
  createdAt: z.string(),
  deletedAt: z.date().nullish(),
});

const contactSchemaRequest = contactSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
});

const contactsSchemaResponse = z.array(
  contactSchema.omit({
    createdAt: true,
    deletedAt: true,
  })
);

const contactSchemaResponse = contactSchema.omit({
  createdAt: true,
  deletedAt: true,
});

const contactSchemaUpdateRequest = contactSchemaRequest.partial();

export {
  contactSchema,
  contactSchemaRequest,
  contactsSchemaResponse,
  contactSchemaUpdateRequest,
  contactSchemaResponse,
};
