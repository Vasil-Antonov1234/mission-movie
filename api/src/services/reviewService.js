import reviewRepository from "../repositories/reviewRepository.js"

export default {
    async create(movieId, userId, parsedData) {
        return await reviewRepository.create(movieId, userId, parsedData);
    }
}