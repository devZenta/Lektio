import { createMiddleware } from "hono/factory";
import prisma from "../lib/prisma.js";
import type { AppVariables } from "../types/context.types.js";

const withPrisma = createMiddleware<{ Variables: AppVariables}>(async (c, next) => {
    if (!c.get("prisma")) {
        c.set("prisma", prisma);
    }
    await next();
})

export default withPrisma;