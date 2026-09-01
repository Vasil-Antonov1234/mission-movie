import * as z from "zod";

export function getErrorMessage(error) {
    console.log(error.name)
    
    switch (error.name) {
        case "ZodError":
            return Object.values(z.flattenError(error).fieldErrors).flat().join(", ") || "Invalid input";
        default:
        return error.message || "An unknown error occured";
    }
}