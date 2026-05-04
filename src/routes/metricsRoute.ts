import { Hono } from "hono";
import register from "../lib/metrics.js";

const router = new Hono({
  strict: false,
});

router.get("/", async (c) => {
  c.header("Content-Type", register.contentType);
  const metrics = await register.metrics();
  return c.text(metrics, 200);
});

export default router;
