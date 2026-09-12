import * as z from "zod";
import bcrypt from "bcrypt";

export const changePasswordSchema = z.object({
    password: z.string()
        .min(8, { error: "Password must be at least 8 characters long" })
        .transform(async (val) => {
            const hash = await bcrypt.hash(val, 10);
            return hash;
        })
})