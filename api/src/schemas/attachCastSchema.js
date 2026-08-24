import * as z from "zod";

export const attachCastSchema = z.object({
    cast: z.coerce.number({ error: "Invalid cast id format" })
        .min(1, { error: "Invalid cast id" }),
    movieId: z.coerce.number({ error: "Invalid movie id format" })
        .min(1, { error: "Invalid movie id" }),
    nameInMovie: z.string()
        .min(2, { error: "Name in movie must be at least 2 characters long"})
        .regex(/^[A-Z]{1}[a-z]+/, { error: "Name in movie must start with a capital letter"})
});