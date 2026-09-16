import * as z from "zod";

export const createReviewSchema = z.object({
    content: z.string()
        .min(70, { error: "A review must be at least 70 characters long" })
});