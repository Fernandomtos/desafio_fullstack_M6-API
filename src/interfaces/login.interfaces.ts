import { z } from "zod";
import { userEmailSchema, userLoginSchema } from "../schemas/user.schema";
import { TUserResponse } from "./users.interfaces";

type TLoginRequest = z.infer<typeof userLoginSchema>;

interface IToken {
  token: string;
  userData: TUserResponse;
}

export { TLoginRequest, IToken };
