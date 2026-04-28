import { Hono } from "hono";
import prisma from "../lib/prisma.js";

const router = new Hono({
    strict: false,
});

router.get("/", (c) => {
    return c.json({ status: "OK" }, 200);
});

router.get("/redis", (c) => {
    return c.json({ status: "Not Implemented" }, 501);
});

router.get("/postgres", async (c) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
    } catch (error) {
        return c.json({ status: "error", error: error instanceof Error ? error.message : String(error) }, 503);
    }
    return c.json({ status: "OK" }, 200);
});

router.get("/vllm", (c) => {
    return c.json({ status: "Not Implemented" }, 501);
});

export default router;