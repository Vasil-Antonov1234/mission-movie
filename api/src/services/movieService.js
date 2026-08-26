import movieRepository from "../repositories/movieRepository.js"

export default {
    async create(movieData, userId) {
        return await movieRepository.createOne(movieData, userId);
    },

    async getAll(filter) {

        if (filter.query.authorId) {
            filter.query.authorId = Number(filter.query.authorId);
        };

        if (filter.query.year) {
            filter.query.year = Number(filter.query.year);
        };

        if (filter.query.rating) {
            filter.query.rating = Number(filter.query.rating);
        };

        return await movieRepository.getAll(filter);
    },

    async getById(movieId, filter) {
        const movie = await movieRepository.getById(movieId, filter);

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
    },

    async getSimilar(filter) {
        filter.movieId = Number(filter.movieId);

        return await movieRepository.getSimilar(filter);
    },

    async getLatest() {
        return await movieRepository.getLatest();
    },

    async getFilmography(castId) {
        return await movieRepository.getFilmography(castId);
    }
}