import * as z from "zod";
import bcrypt from "bcrypt";

export const createUserSchema = z.object({
    firstName: z.string({ error: "Only string is available as first name" })
        .min(1, { error: "First name is required" }),
    lastName: z.string({ error: "Only string is available as last name"})
        .min(1, { error: "First name is required" }),
    email: z.email({ error: "Invalid email address"}),
    password: z.string()
        .min(8, { error: "Password must be at least 8 characters long"})
        .transform(async (val) => {
            const hash = await bcrypt.hash(val, 10);
            return hash;
        })
})