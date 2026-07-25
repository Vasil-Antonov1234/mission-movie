import movieRepository from "../repositories/movieRepository.js"

export default {
    async create(movieData) {
        return await movieRepository.createOne(movieData);
    },

    async getAll() {
        return await movieRepository.getAll();
    },

    async getById(movieId) {
        const movie = await movieRepository.getById(Number(movieId));

        if (!movie) {
            throw new Error("This movie does not exists in the database");
        };

        return movie;
    }
}