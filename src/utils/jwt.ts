import * as jwt from "jsonwebtoken";
// import { User } from "../models/user";

const SECRET = process.env.JWT_SECRET as string;

export function generateJWT(id: string) {
  return jwt.sign(
    {
      id: id,
    },
    SECRET
  );
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(String(token), SECRET);

    const id = (decoded as jwt.JwtPayload).id;
    return id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
