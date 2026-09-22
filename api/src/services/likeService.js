import likeRepository from "../repositories/likeRepository.js"

export default {
    async createOne(reviewId, userId) {
        return await likeRepository.createOne(reviewId, userId);
    }
}