import movieRepository from "../repositories/movieRepository";
import rateRepository from "../repositories/rateRepository"

export default {
    async rateMovie(rating, movieId, userId) {
        const movie = await movieRepository.getById(movieId);
        const isOwner = movie.authorId === userId;

        if (isOwner) {
            throw new Error("You is not allowed to rate your own movies");
        };

        const hasRated = await rateRepository.getHasRated(userId, movieId);

        if (hasRated) {
            throw new Error("You have already rated this movie");
        };

        await rateRepository.rateMovie(rating, movieId, userId);
        const rates = await rateRepository.getRatesCount(movieId);
        const totalRates = Number(rates[0].count) + 1;

        const totalRating = movie.totalRating;
        const newMovieRating = Number(((totalRating + rating) / totalRates).toFixed(1));
        const newTotalRating = movie.totalRating + rating;

        return await movieRepository.updateRating(movieId, newMovieRating, newTotalRating);
    }
}