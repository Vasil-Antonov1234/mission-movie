import rateRepository from "../repositories/rateRepository"

export default {
    async rateMovie(rating, movieId, userId) {
        const rate = await rateRepository.rateMovie(rating, movieId, userId);
        const rates = await rateRepository.getRatesCount(movieId);
        const totalRates = Number(rates[0].count) + 1;
        
    }
}