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
    }
}