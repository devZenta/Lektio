import { Hono } from "hono";
import requireAuth from "../middlewares/authMiddleware.js";
import { zValidator } from "@hono/zod-validator";
import jobIdParamsSchema from "../validators/jobSchema.js";
import { ExtractionStatus } from "../generated/prisma/enums.js";

const router = new Hono({
    strict: false,
});

router.get("/:id", requireAuth, zValidator("param", jobIdParamsSchema), async (c) => {

    const user = c.get("user");

    if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const { id } = c.req.valid("param");
    const prisma = c.get("prisma");

    const job = await prisma.extractionLog.findUnique({
        where: { jobId: id },
    });

    if (!job) {
        return c.json({ error: "Job not found" }, 404);
    }

    const userId = user.id;

    if (job.userId !== userId) {
        return c.json({ error: "Forbidden" }, 403);
    }

    return c.json({ job }, 200);
});

router.post("/", requireAuth, async (c) => {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!(file instanceof File)) {
        return c.json({ error: "Invalid file" }, 400);
    }

    if (file.type !== "application/pdf") {
        return c.json({ error: "Invalid file type, only PDF allowed" }, 400);
    }

    const prisma = c.get("prisma");
    const user = c.get("user");

    if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const jobId = crypto.randomUUID();

    const job = await prisma.extractionLog.create({
        data: {
            jobId: jobId,
            userId: user.id,
            status: ExtractionStatus.PENDING,
            inputFilename: file.name,
        },
    });

    return c.json({ jobId: job.jobId, status: job.status }, 202);
});

export default router;