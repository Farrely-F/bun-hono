import { Context } from "hono";
import { prisma } from "../db/db";
import { generalResponse } from "../utils/response";
import { verifyJWT } from "../utils/jwt";

export const createComment = async (c: Context) => {
  try {
    const { post_id, content } = await c.req.json();
    const headers = c.req.header("Authorization")?.split(" ")[1] as string;
    const userId = headers && verifyJWT(headers);

    if (!userId) {
      return c.json({ ...generalResponse(401, "Unauthorized") }, 401);
    }

    const comment = await prisma.comment.create({
      data: {
        post_id: post_id,
        user_id: userId,
        content,
      },
    });
    return c.json({ ...generalResponse(), data: comment }, 201);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return c.json({ ...generalResponse(400, error.message) }, 400);
    }
  }
};
