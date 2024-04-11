import { Context } from "hono";
import { User } from "../models/user";
import { generalResponse } from "../utils/response";
import { generateJWT } from "../utils/jwt";

export const getAllUsers = async (c: Context) => {
  const users = await User.findAll();
  return c.json({ ...generalResponse(), data: users }, 200);
};

export const createUser = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json();
    await User.create(name, email, password);
    return c.json({ ...generalResponse(201, "sucessfully registered") }, 201);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("client side error:", err.message);
      return c.json({ ...generalResponse(400, err.message) }, 400);
    } else {
      console.error("server side error:", err);
      return c.text("Internal Server Error", 500);
    }
  }
};

export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await User.login(email, password);
    return c.json(
      { ...generalResponse(), access_token: generateJWT(user) },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("client side error:", error.message);
      return c.json({ ...generalResponse(400, error.message) }, 400);
    } else {
      console.error("server side error:", error);
      return c.text("Internal Server Error", 500);
    }
  }
};
