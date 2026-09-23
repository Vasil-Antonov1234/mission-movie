import { Router } from "express";
import { isAdmin, isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import reviewService from "../services/reviewService.js";
import { createReviewSchema } from "../schemas/reviewSchema.js";

const reviewController = Router();

reviewController.get("/yours", isAuthMiddleware, async (req, res) => {
    const userId = Number(req.user.id);

    try {
        const result = await reviewService.getYours(userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

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

reviewController.get("/latest", async (req, res) => {
    try {
        const latest = await reviewService.getLatest();

        res.status(200).json(latest);
    } catch (error) {
        res.status(200).json(h = getErrorMessage(error));
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
});

reviewController.get("/:movieId/hasWrittenReview", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);

    try {
        const hasWrittenRewiew = await reviewService.getHasWrittenReview(movieId, userId);

        res.status(200).json(hasWrittenRewiew);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

reviewController.get("/for-movie/:movieId", async (req, res) => {
    const movieId = Number(req.params.movieId);

    try {
        const reviews = await reviewService.getForMovie(movieId);

        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

reviewController.get("/:movieId/:reviewId/hasOwner", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const reviewId = Number(req.params.reviewId);
    const userId = Number(req.user.id);

    try {
        const hasOwner = await reviewService.hasOwner(movieId, userId, reviewId);

        res.status(200).json(hasOwner);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

reviewController.get("/", async (req, res) => {

    try {
        const result = await reviewService.getAll();

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

reviewController.patch("/edit/:reviewId", isAuthMiddleware, async (req, res) => {
    const userId = Number(req.user.id);
    const movieId = Number(req.body.movieId);
    const reviewId = Number(req.params.reviewId);

    
    try {
        const review = await reviewService.getById(reviewId);

        if (review.userId !== userId) {
            throw new Error("Unauthorised");
        };
        
        const result = await reviewService.updateOne(userId, movieId, req.body);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

reviewController.get("/:userId/count", isAuthMiddleware, isAdmin, async (req, res) => {
    const userId = Number(req.params.userId);

    try {
      const result = await reviewService.countByUserId(userId);
      
      res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

export default reviewController;