import { Router } from "express";
import { createMovieSchema } from "../schemas/movieSchema.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import movieService from "../services/movieService.js";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { patrialMovieSchema } from "../schemas/partialMovieSchema.js";
import querystring from "node:querystring";

const movieController = Router();

movieController.get("/filmography/:castId", async (req, res) => {
    const castId = Number(req.params.castId)
    
    const result = await movieService.getFilmography(castId);

    res.json(result);
})

movieController.get("/", async (req, res) => {

    let filter = {
        query: {},
        select: {
            poster: true,
            title: true,
            genre: true,
            year: true,
            rating: true,
            id: true,
            authorId: false,
            synopsis: false,
            duration: false,
            director: false,
            trailerUrl: false,
            createdAt: false,
            updatedAt: false,
            author: false
        }
    };

    if (req.query.where) {
        if (Array.isArray(req.query.where)) {
            req.query.where.forEach((x) => filter.query[x.replaceAll('"', '').split("=")[0]] = x.replaceAll('"', '').split("=")[1]);
        } else {
            filter.query = querystring.parse(req.query.where.replaceAll('"', ''));
        }
    };

    const query = {};

    Object.keys(filter.query).forEach((x) => {
        query[x] = filter.query[x]
    });

    filter.query = query;

    try {
        const movies = await movieService.getAll(filter);

        res.json(movies);
    } catch (error) {
        res.json(getErrorMessage(error));
    }

});

movieController.get("/similar", async (req, res) => {
    let filter = {}

    if (req.query.where) {
        if (Array.isArray(req.query.where)) {
            req.query.where.forEach((x) => filter[x.replaceAll('"', '').split("=")[0]] = x.replaceAll('"', '').split("=")[1]);
        } else {
            filter = querystring.parse(req.query.where.replaceAll('"', ''));
        }
    };

    const query = {};

    Object.keys(filter).forEach((x) => {
        query[x] = filter[x]
    });

    filter = query;

    try {
        const similarMovies = await movieService.getSimilar(filter);

        res.json(similarMovies);
    } catch (error) {
        res.json(getErrorMessage(error));
    }
});

movieController.get("/latest", async (req, res) => {

    try {
        const latestMovies = await movieService.getLatest();

        res.status(200).json(latestMovies);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});


movieController.post("/create", isAuthMiddleware, async (req, res) => {

    try {
        const movieData = await createMovieSchema.parseAsync(req.body);
        const userId = Number(req.user.id);

        const movie = await movieService.create(movieData, userId);

        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

movieController.get("/:movieId", async (req, res) => {
    const movieId = Number(req.params.movieId);

    let filter = {};

    if (req.query.select) {
        if (Array.isArray(req.query.select)) {
            req.query.select.forEach((x) => filter[x.replaceAll('"', '').split("=")[0]] = x.replaceAll('"', '').split("=")[1]);
        } else {
            filter = querystring.parse(req.query.select.replaceAll('"', ''));
        };
    };

    Object.keys(filter).forEach((x) => filter[x] = true);

    try {
        const movie = await movieService.getById(movieId, filter);

        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
});

movieController.delete("/:movieId", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);

    try {
        const movie = await movieService.removeById(movieId, userId);

        res.status(200).json(`${movie.title} has been deleted`);
    } catch (error) {
        res.status(400).json(getErrorMessage(error))
    }
});

movieController.patch("/:movieId", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);
    const movieData = req.body;
    
    try {
        const parsedMovieData = await patrialMovieSchema.parseAsync(movieData);
        const movie = await movieService.updateOne(movieId, userId, parsedMovieData);

        res.status(200).json({ movie });
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

export default movieController;