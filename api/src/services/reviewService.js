import reviewRepository from "../repositories/reviewRepository.js"

export default {
    async create(movieId, userId, parsedData) {
        return await reviewRepository.create(movieId, userId, parsedData);
    },

    async getAll() {
        return await reviewRepository.getAll();
    },

    async getById(reviewId) {
        return await reviewRepository.getById(reviewId);
    },

    async getLatest() {
        return await reviewRepository.getLatest();
    },

    async getHasWrittenReview(movieId, userId) {
        const response = await reviewRepository.getHasWrittenReview(movieId, userId);

        return response ? true : false;
    },

    async getYours(userId) {
        return await reviewRepository.getYours(userId);
    }
}