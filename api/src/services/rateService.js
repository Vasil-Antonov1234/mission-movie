import rateRepository from "../repositories/rateRepository"

export default {
    async rateMovie(rating, movieId, userId) {
        return await rateRepository.rateMovie(rating, movieId, userId);
    }
}