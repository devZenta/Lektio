import { z } from "zod";

const jobIdParamsSchema = z.object({
    id: z.uuid(),
})

export default jobIdParamsSchema;