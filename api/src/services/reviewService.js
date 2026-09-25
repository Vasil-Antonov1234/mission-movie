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

    async hasOwner(movieId, userId, reviewId) {
        const response = await reviewRepository.hasOwner(movieId, userId, reviewId);

        return response ? true : false;
    },

    async getYours(userId) {
        return await reviewRepository.getYours(userId);
    },

    async updateOne(userId, movieId, data) {
        return await reviewRepository.updateOne(userId, movieId, data);
    },

    async getForMovie(movieId) {
        return await reviewRepository.getForMovie(movieId)
    },

    async countByUserId(userId) {
        return await reviewRepository.countByUserId(userId);
    },

    async removeByID(reviewId) {
        return await reviewRepository.removeById(reviewId);
    }
}