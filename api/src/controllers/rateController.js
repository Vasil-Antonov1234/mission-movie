import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/authMiddleware";
import { getErrorMessage } from "../utils/errorUtil";
import rateService from "../services/rateService";

const rateController = Router();

rateController.post("/:movieId", isAuthMiddleware, async (req, res) => {
    const rating = Number(req.body.userRating);
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);

    try {
        
        const updatedMovie = await rateService.rateMovie(rating, movieId, userId);

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

export default rateController;