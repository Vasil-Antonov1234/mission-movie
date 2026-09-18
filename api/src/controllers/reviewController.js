import { Router } from "express"; 
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import reviewService from "../services/reviewService.js";
import { createReviewSchema } from "../schemas/reviewSchema.js";

const reviewController = Router();

reviewController.get("/", async (req, res) => {

    try {
        const result = await reviewService.getAll();

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

reviewController.post("/create", isAuthMiddleware, async (req, res) => {

    const movieId = Number(req.body.movieId);
    const userId = Number(req.user.id);
    const parsedData = await createReviewSchema.parseAsync(req.body);

    try {
        const result = await reviewService.create(movieId, userId, parsedData);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

reviewController.get("/:reviewId", async (req, res) => {
    const reviewId = Number(req.params.reviewId);

    try {
      const result = await reviewService.getById(reviewId);

      res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

export default reviewController;