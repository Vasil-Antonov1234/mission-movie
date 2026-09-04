import movieRepository from "../repositories/movieRepository";
import rateRepository from "../repositories/rateRepository"

export default {
    async rateMovie(rating, movieId, userId) {
        await rateRepository.rateMovie(rating, movieId, userId);
        const rates = await rateRepository.getRatesCount(movieId);
        const totalRates = Number(rates[0].count) + 1;

        const movie = await movieRepository.getById(movieId);
        const totalRating = movie.totalRating;
        const newMovieRating = Number(((totalRating + rating) / totalRates).toFixed(1));
        const newTotalRating = movie.totalRating + rating;

        return await movieRepository.updateRating(movieId, newMovieRating, newTotalRating);
    }
}