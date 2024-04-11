import { Context } from "hono";
import { User } from "../models/user";
import { generalResponse } from "../utils/response";
import { generateJWT, verifyJWT } from "../utils/jwt";
import { prisma } from "../db/db";
import { comparePassword, hashPassword } from "../utils/bcrypt";

export const getAllUsers = async (c: Context) => {
  const token = c.req.header("Authorization")?.split(" ")[1] as string;
  const userId = token && verifyJWT(token);

  if (!userId) {
    return c.json({ ...generalResponse(401, "Unauthorized") }, 401);
  }

  // const users = await User.findAll();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return c.json({ ...generalResponse(), data: users }, 200);
};

export const createUser = async (c: Context) => {
  try {
    let { name, email, password } = await c.req.json();
    // await User.create(name, email, password);
    password = await hashPassword(password);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
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
    let { email, password } = await c.req.json();
    // const user = await User.login(email, password);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },

      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    password = await comparePassword(password, user?.password!);

    if (!user || !password) {
      throw new Error(
        !user ? "Invalid Email, user not found" : "Invalid password"
      );
    }

    if (user && password) {
      return c.json(
        { ...generalResponse(), access_token: generateJWT(user?.id!) },
        200
      );
    }
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
