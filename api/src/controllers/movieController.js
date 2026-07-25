import { Router } from "express";
import { createMovieSchema } from "../schemas/movieSchema.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const movieController = Router();

movieController.get("/", (req, res) => {   
    console.log(req.user);

    // get all
    res.json([]);
});


movieController.post("/create", async (req, res) => {
    
    try {
        const movieData = await createMovieSchema.parseAsync(req.body);
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    };
})

export default movieController;