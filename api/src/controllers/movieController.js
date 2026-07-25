import { Router } from "express";
import { createMovieSchema } from "../schemas/movieSchema.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get("/", async (req, res) => {   

    try {
        const movies = await movieService.getAll();

        res.json(movies);
    } catch (error) {
        res.json({ error: getErrorMessage(error) });
    }

});


movieController.post("/create", async (req, res) => {
    
    try {
        const movieData = await createMovieSchema.parseAsync(req.body);

        const movie = await movieService.create(movieData);

        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    };
})

export default movieController;