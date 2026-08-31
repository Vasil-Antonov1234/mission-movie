import * as z from "zod";

export const createCommentSchema = z.object({
    content: z.string({ error: "Invalid data" })
        .min(1, { error: "A comment must be at leats 1 character long"})
});