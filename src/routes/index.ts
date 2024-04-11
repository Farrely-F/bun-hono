import { Hono } from "hono";
import { createUser, getAllUsers, login } from "../controllers/user";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
} from "../controllers/post";
import { createComment } from "../controllers/comment";
import { cors } from "hono/cors";

const router = new Hono().basePath("/api/v1");

router.get("/", (c) => {
  return c.json({ status: 200, message: "Welcome to HONO" });
});

router.use(
  cors({
    origin: ["http://localhost:5173"],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// USERS ENDPOINTS
router.get("/users", getAllUsers);
router.post("/register", createUser);
router.post("/login", login);

// POSTS ENDPOINTS
router.get("/posts", getAllPosts);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);
router.patch("/posts/:id", editPost);

// COMMENTS ENDPOINTS
router.post("/comments", createComment);

export default router;
