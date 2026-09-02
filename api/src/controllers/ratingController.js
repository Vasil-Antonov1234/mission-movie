import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/authMiddleware";

const ratingController = Router();

ratingController.post("/:movieId", isAuthMiddleware, async (req, res) => {
    const rating = Number(req.body.userRating);
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);

})

export default ratingController;