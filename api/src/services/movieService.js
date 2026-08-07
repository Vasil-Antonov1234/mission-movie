import movieRepository from "../repositories/movieRepository.js"

export default {
    async create(movieData, userId) {
        return await movieRepository.createOne(movieData, userId);
    },

    async getAll(filter) {

        if (filter.query.authorId) {
            filter.query.authorId = Number(filter.authorId);
        };

        if (filter.query.year) {
            filter.query.year = Number(filter.year);
        };

        if (filter.query.rating) {
            filter.query.rating = Number(filter.rating);
        };

        return await movieRepository.getAll(filter);
    },

    async getById(movieId) {
        const movie = await movieRepository.getById(movieId);

        if (!movie) {
            throw new Error("This movie does not exists in the database");
        };

        return movie;
    },

    async removeById(movieId, userId) {
        const movie = await movieRepository.getById(movieId);

        if (!movie) {
            throw new Error("Movie not found");
        };

        if (movie.authorId !== userId) {
            throw new Error("Unauthorized");
        };

        return await movieRepository.removeById(movieId, userId)
    },

    async updateOne(movieId, userId, parsedMovieData) {
        const movie = await movieRepository.getById(movieId);

        if (!movie) {
            throw new Error("Movie not found");
        };

        if (movie.authorId !== userId) {
            throw new Error("Unauthorized");
        };

        return await movieRepository.updateOne(movieId, userId, parsedMovieData);
    }
}