import { Hono } from "hono";
import router from "./routes";

const PORT = process.env.PORT || 8000;

const app = new Hono(router).mount("/", router.fetch);

export default {
  fetch: app.fetch,
  port: PORT,
};
