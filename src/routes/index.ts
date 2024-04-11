import { Hono } from "hono";
import { createUser, getAllUsers, login } from "../controllers/user";

const router = new Hono().basePath("/api/v1");

router.get("/", (c) => {
  return c.json({ status: 200, message: "Welcome to HONO" });
});

// USERS ENDPOINTS
router.get("/users", getAllUsers);
router.post("/register", createUser);
router.post("/login", login);

export default router;
