import * as z from "zod";

export const createReviewSchema = z.object({
    content: z.string()
        .min(70, { error: "A review must be at least 70 characters long" }),
    movieId: z.coerce.number(),
    directorScore: z.coerce.number(),
    performanceScore: z.coerce.number(),
    screenplayScore: z.coerce.number(),
    cinematographyScore: z.coerce.number()
});