import likeRepository from "../repositories/likeRepository.js"

export default {
    async createOne(reviewId, userId) {
        return await likeRepository.createOne(reviewId, userId);
    },

    async getHasLiked(reviewId, userId) {
        const result = await likeRepository.getHasLicked(reviewId, userId);

        const hasLiked = result ? true : false;

        return hasLiked;
    }
}