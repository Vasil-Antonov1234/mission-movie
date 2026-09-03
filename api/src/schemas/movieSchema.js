import * as z from "zod";

export const createMovieSchema = z.object({
    title: z.string()
        .min(1, { error: "Movie title is required"}),
    year: z.coerce.number({ error: "Invalid year format. Must be example:'2024'"})
        .min(1888, { error: "Year cannot be before 1888"} ),
    rating: z.coerce.number({ error: "Rating must be integer" })
        .min(1, { error: "Rating must be at least 1" })
        .max(10, { error: "Rating cannot be bigger than 10"}),
    totalRating: z.coerce.number({ error: "Total rating must be integer" })
        .min(0, { error: "Totl rating must be at least 0"})
        .max(10, { error: "Total rating must be at most 10"}),
    genre: z.string()
        .regex(/^[A-Za-z \,]/, { error: "Invalid genre" }),
    poster: z.httpUrl({ error: "Invalid movie poster URL format" }),
    synopsis: z.string()
        .min(30, { error: "Sinopsis must be at least 30 characters long"}),
    duration: z.string()
        .regex(/^[0-9]{1,2}h [0-9]{1,2}m$/, { error: "Invalid duration format"}),
    director: z.string()
        .min(1, { error: "Director is required"})
        .regex(/^[A-Z]/, { error: "The director's name must start with a capital letter"}),
    trailerUrl: z.httpUrl({ error: "Invalid movie trailer URL format"}).optional().or(z.literal("")),
    tagline: z.string()
        .min(1, { error: "Tagline is required"}),
    writtenBy: z.string()
        .min(5, { error: "A writter name must be at least 5 characters long"})
        .regex(/^[A-Z]/, { error: "The writer's name must start with a capital letter"}),
    studio: z.string()
        .min(1, { error: "Studio is required" }),
    releaseDate: z.string()
        .regex(/^([A-Z]{1}[a-z]{1,9}) ([1-2][0-9]|3[0-1]|[1-9])$/, { error: "Invalid date format" }),
    language: z.string()
        .min(5, { error: "Language must be at least 5 characters"}),
    country: z.string()
        .min(2, { error: "Country must be at least 2 characters"}),
    budget: z.string()
        .regex(/^\$\d{1,3} ?\d{0,3} ?\d{0,3}M?$/, { error: "Invalid budget data" }),
    boxOffice: z.string()
        .regex(/^\$\d{1,3} ?\d{0,3} ?\d{0,3}M?$/, { error: "Invalid box office data"})
})