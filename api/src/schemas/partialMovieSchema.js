import * as z from "zod";

export const patrialMovieSchema = z.object({
    title: z.string()
        .min(1, { error: "Movie title is required" }).optional(),
    year: z.coerce.number({ error: "Invalid year format. Must be example:'2024'" })
        .min(1888, { error: "Year cannot be before 1888" }).optional(),
    rating: z.coerce.number({ error: "Rating must be integer" })
        .min(1, { error: "Rating must be at least 1" })
        .max(10, { error: "Rating cannot be bigger than 10" }).optional(),
    genre: z.string()
        .regex(/^[A-Za-z \,]/, { error: "Invalid genre" }).optional(),
    poster: z.httpUrl({ error: "Invalid movie poster URL format" }).optional(),
    synopsis: z.string()
        .min(30, { error: "Sinopsis must be at least 30 characters" }).optional(),
    duration: z.string()
        .regex(/^[0-9]{1,2}h [0-9]{1,2}m$/, { error: "Invalid duration format" }).optional(),
    director: z.string()
        .min(1, { error: "Director is required" })
        .regex(/^[A-Z]/, { error: "The director's name must start with a capital letter" }).optional(),
    trailerUrl: z.httpUrl({ error: "Invalid movie trailer URL format" }).optional(),
    tagline: z.string()
        .min(1, { error: "Tagline is required" }).optional(),
    writtenBy: z.string()
        .min(5, { error: "A writter name must be at least 5 characters long" })
        .regex(/^[A-Z]/, { error: "The writer's name must start with a capital letter" }).optional(),
    studio: z.string()
        .min(1, { error: "Studio is required" }).optional(),
    releaseDate: z.string()
        .regex(/^([A-Z]{1}[a-z]{1,9}) ([1-2][0-9]|3[0-1]|[1-9])$/, { error: "Invalid date format" }).optional(),
    language: z.string()
        .min(5, { error: "Language must be at least 5 characters" }).optional(),
    country: z.string()
        .min(2, { error: "Country must be at least 2 characters" }).optional(),
    budget: z.string()
        .regex(/^\$\d{1,3} ?\d{0,3} ?\d{0,3}M?$/, { error: "Invalid budget data" }).optional(),
    boxOffice: z.string()
        .regex(/^\$\d{1,3} ?\d{0,3} ?\d{0,3}M?$/, { error: "Invalid box office data" }).optional()
})