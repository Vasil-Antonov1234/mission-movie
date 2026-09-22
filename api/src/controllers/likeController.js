import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import likeService from "../services/likeService.js";

const likeController = Router();

likeController.post("/add", isAuthMiddleware, async (req, res) => {
    const reviewId = Number(req.body.reviewId);
    const userId = Number(req.user.id);
    try {
        const result = await likeService.createOne(reviewId, userId);
        
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

likeController.get("/has-liked/:reviewId/:userId", async (req, res) => {
    const reviewId = Number(req.params.reviewId);
    const userId = Number(req.params.userId);

    try {
      const hasLiked = await likeService.getHasLiked(reviewId, userId);
      
      res.status(200).json(hasLiked);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

likeController.delete("/remove/:reviewId", isAuthMiddleware, async (req, res) => {
    const reviewId = Number(req.params.reviewId);
    const userId = Number(req.user.id);

    try {
        const removedReview = await likeService.remove(reviewId, userId);

        res.status(200).json(removedReview);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

export default likeController;