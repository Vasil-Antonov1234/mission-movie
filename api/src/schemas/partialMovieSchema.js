import * as z from "zod";

export const patrialMovieSchema = z.object({
    title: z.string()
        .min(1, { error: "Movie title is required"}).optional(),
    year: z.coerce.number({ error: "Invalid year format. Must be example:'2024'"})
        .min(1888, { error: "Year cannot be before 1888"} ).optional(),
    rating: z.coerce.number({ error: "Rating must be integer" })
        .min(1, { error: "Rating must be at least 1" })
        .max(10, { error: "Rating cannot be bigger than 10"}).optional(),
    genre: z.string()
        .regex(/^[A-Za-z \,]/, { error: "Invalid genre" }).optional(),
    poster: z.httpUrl({ error: "Invalid movie poster URL format" }).optional(),
    synopsis: z.string()
        .min(30, { error: "Sinopsis must be at least 30 characters"}).optional(),
    duration: z.string()
        .regex(/^[0-9]{1,2}h [0-9]{1,2}m$/, { error: "Invalid duration format"}).optional(),
    director: z.string()
        .min(1, { error: "Director is required"}).optional(),
    trailerUrl: z.httpUrl({ error: "Invalid movie trailer URL format"}).optional()
})