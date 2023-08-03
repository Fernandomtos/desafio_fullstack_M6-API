import { z } from "zod";
import { userEmailSchema } from "../schemas/user.schema";

type TUserEmailData = z.infer<typeof userEmailSchema>;

export default TUserEmailData;
