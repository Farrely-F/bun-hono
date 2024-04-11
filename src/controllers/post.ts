import { Context, MiddlewareHandler } from "hono";
import { verifyJWT } from "../utils/jwt";
import { generalResponse } from "../utils/response";
import { prisma } from "../db/db";

export const getAllPosts = async (c: Context) => {
  const token = c.req.header("Authorization")?.split(" ")[1] as string;
  const userId = token && verifyJWT(token);

  if (!userId) {
    return c.json({ ...generalResponse(401, "Unauthorized") }, 401);
  }

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      caption: true,
      created_at: true,
      author_details: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          created_at: true,
          user_details: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      created_at: "desc",
    },
  });
  return c.json({ ...generalResponse(), data: posts }, 200);
};

export const createPost = async (c: Context) => {
  try {
    const { title, caption } = await c.req.json();
    const headers = c.req.header("Authorization");
    const token = headers?.split(" ")[1] as string;
    const userId = headers && verifyJWT(token);

    if (!userId) {
      return c.text("Unauthorized", 401);
    }

    const validateUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!validateUser) {
      return c.text("Unauthorized", 401);
    }

    const post = await prisma.post.create({
      data: {
        title,
        caption,
        user_id: userId,
      },

      select: {
        id: true,
        user_id: true,
        title: true,
        caption: true,
        created_at: true,
      },
    });
    return c.json({ ...generalResponse(), data: post }, 201);
  } catch (error) {
    console.error(error);
    return c.text("Internal Server Error", 500);
  }
};

export const deletePost = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const headers = c.req.header("Authorization");

    if (!id) {
      return c.json({ ...generalResponse(400, "id is required") }, 400);
    }

    const token = headers?.split(" ")[1] as string;
    const userId = headers && verifyJWT(token);

    if (!userId) {
      return c.json({ ...generalResponse(401, "Unaothorized") }, 401);
    }

    const post = await prisma.post.findFirst({
      where: {
        id,
      },

      select: {
        user_id: true,
      },
    });

    if (!post) {
      return c.json({ ...generalResponse(404, "post not found") }, 404);
    }

    if (post.user_id !== userId) {
      return c.json({ ...generalResponse(401, "Unaothorized") }, 401);
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return c.json({ ...generalResponse(200, "post deleted") }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ ...generalResponse(400, error.message) }, 400);
    }
    return c.text("Internal Server Error", 500);
  }
};

export const editPost = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const { title, caption } = await c.req.json();
    const headers = c.req.header("Authorization");
    const token = headers?.split(" ")[1] as string;
    const userId = headers && verifyJWT(token);

    if (!id) {
      return c.json({ ...generalResponse(400, "id is required") }, 400);
    }

    if (!userId) {
      return c.json({ ...generalResponse(401, "Unaothorized") }, 401);
    }

    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      return c.json({ ...generalResponse(404, "post not found") }, 404);
    }

    if (post.user_id !== userId) {
      return c.json({ ...generalResponse(401, "Unaothorized") }, 401);
    }

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        caption,
      },
    });
    return c.json({ ...generalResponse(200, "post updated") }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ ...generalResponse(400, error.message) }, 400);
    }
    return c.text("Internal Server Error", 500);
  }
};
