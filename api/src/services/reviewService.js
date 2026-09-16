import reviewRepository from "../repositories/reviewRepository.js"

export default {
    async create(movieId, userId, content) {
        return await reviewRepository.create(movieId, userId, content);
    }
}