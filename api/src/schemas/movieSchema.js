import * as z from "zod";

export const createMovieSchema = z.object({
    title: z.string()
        .min(1, { error: "Movie title is required"}),
    year: z.coerce.number({ error: "Invalid year format. Must be example:'2024'"})
        .min(1888, { error: "Year cannot be before 1888"} ),
    rating: z.coerce.number({ error: "Rating must be integer" })
        .min(1, { error: "Rating must be at least 1" })
        .max(10, { error: "Rating cannot be bigger than 10"}),
    genre: z.string()
        .regex(/^[A-Za-z \,]/, { error: "Invalid genre" }),
    poster: z.httpUrl({ error: "Invalid URL format" }),
    synopsis: z.string()
        .min(1, { error: "Sinopsis is required"}),
    duration: z.string()
        .regex(/^[0-9]h [0-9]m$/, { error: "Invalid duration format"}),
    director: z.string()
        .min(1, { error: "Director is required"}),
    trailerUrl: z.httpUrl({ error: "Invalid URL format"}),
    authorId: z.coerce.number({ error: "Invalid author" })
})