import movieRepository from "../repositories/movieRepository";
import rateRepository from "../repositories/rateRepository"

export default {
    async rateMovie(rating, movieId, userId) {
        const rate = await rateRepository.rateMovie(rating, movieId, userId);
        const rates = await rateRepository.getRatesCount(movieId);
        const totalRates = Number(rates[0].count) + 1;

        const movie = await movieRepository.getById(movieId);
        const movieRating = movie.rating;
        const newMovieRating = ((movieRating + rating) / 2).toFixed(1);
        const newTotalRating = movie.totalRating + rating;

    }
}