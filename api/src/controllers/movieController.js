import { Router } from "express";
import { createMovieSchema } from "../schemas/movieSchema.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import movieService from "../services/movieService.js";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { patrialMovieSchema } from "../schemas/partialMovieSchema.js";

const movieController = Router();

movieController.get("/", async (req, res) => {   

    try {
        const movies = await movieService.getAll();

        res.json(movies);
    } catch (error) {
        res.json({ error: getErrorMessage(error) });
    }

});


movieController.post("/create", isAuthMiddleware, async (req, res) => {
    
    try {
        const movieData = await createMovieSchema.parseAsync(req.body);
        const userId = req.user.id;

        const movie = await movieService.create(movieData, userId);

        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    };
});

movieController.get("/:movieId", async (req, res) => {
    const movieId = Number(req.params.movieId);

    try {
        const movie = await movieService.getById(movieId);

        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

movieController.delete("/:movieId", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);

    try {
        const movie = await movieService.removeById(movieId, userId);

        res.status(200).json(`${movie.title} has been deleted`);
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) })
    }
});

movieController.patch("/:movieId", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);
    const movieData = req.body;
    
    try {
        const parsedMovieData = await patrialMovieSchema.parseAsync(movieData);
        const movie = await movieService.updateOne(movieId, userId, parsedMovieData);
        
        res.status(200).json({movie});
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    };
})

export default movieController;