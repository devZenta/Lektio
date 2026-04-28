import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";

const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
});

export default auth;