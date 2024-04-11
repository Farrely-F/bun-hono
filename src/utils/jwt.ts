import * as jwt from "jsonwebtoken";
import { User } from "../models/user";

const SECRET = process.env.JWT_SECRET as string;

export function generateJWT(user: User) {
  return jwt.sign(
    {
      id: user.id,
    },
    SECRET
  );
}
