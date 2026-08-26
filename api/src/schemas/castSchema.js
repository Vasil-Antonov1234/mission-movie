import * as z from "zod";

export const createCastSchema = z.object({
    firstName: z.string()
        .min(1, { error: "First name is required" })
        .regex(/^[A-Z]{1}[a-zA-Z]+$/, { error: "The first name must start with a capital letter and contain only letters" }),
    lastName: z.string()
        .min(1, { error: "Last name is required" })
        .regex(/^[A-Z]{1}[a-zA-Z']+$/, { error: "The last name must start with a capital letter and contain only letters" }),
    bornDate: z.string()
        .min(1, { error: "Date of born is required" })
        .regex(/^(January|^February|^March|^April|^May|^June|^July|^August|^September|^October|^November|^December) \d{1,2}, \d{4}$/, { error: "Ivalid date format"}),
    placeOfBorn: z.string()
        .min(1, { error: "Place of born is required" }),
    imageUrl: z.httpUrl({ error: "Invalid URL format"}),
    imdbProfile: z.httpUrl({ error: "Invalid URL format"}).optional(),
    wikipedia: z.httpUrl({ error: "Invalid URL format" }).optional(),
    biography: z.string()
        .regex(/^[A-Z]{1}[\w'/.()]+$/, { error: "The biography must start with a capital letter and not contain any special character" })
        .min(30, { error: "The biography must be at least 30 characters long if provided"}).optional(),
    awards: z.string()
        .regex(/^(?:[A-Z][\w'/.()]+;)(?:\r?\n[A-Z][\w'/.()]+;)*$/g, { error: "The awards must start with a capital letter and follow the pattern" })
        .min(10, { error: "The awards must be at least 10 characters long if any"}).optional()
});