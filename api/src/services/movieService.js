import movieRepository from "../repositories/movieRepository.js"

export default {
    async create(movieData, userId) {
        return await movieRepository.createOne(movieData, userId);
    },

    async getAll() {
        return await movieRepository.getAll();
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

    async updateOne(movieId, userId, movieData) {
        return await movieRepository.updateOne(movieId, userId, movieData);
    }
}