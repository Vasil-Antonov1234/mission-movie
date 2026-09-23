import { prisma } from "../lib/prisma.js";
import likeRepository from "../repositories/likeRepository.js"
import reviewRepository from "../repositories/reviewRepository.js";

export default {
    async createOne(reviewId, userId) {
        const currentReview = await reviewRepository.getById(reviewId);

        const isOwner = currentReview.user.id === userId;

        if (isOwner) {
            throw new Error("You cannot like your own reviews");
        };

        return await likeRepository.createOne(reviewId, userId);
    },

    async getHasLiked(reviewId, userId) {
        const result = await likeRepository.getHasLicked(reviewId, userId);

        const hasLiked = result ? true : false;

        return hasLiked;
    },

    async remove(reviewId, userId) {
        return await likeRepository.remove(reviewId, userId);
    }
}