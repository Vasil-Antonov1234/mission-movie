import commentRepository from "../repositories/commentRepository.js"
import movieRepository from "../repositories/movieRepository.js";

export default {
    async create(userId, movieId, content) {
        const movie = await movieRepository.getById(movieId);

        if (movie.authorId === userId) {
            throw new Error("You cannot write comments about your own movies!");
        };

        return await commentRepository.create(userId, movieId, content);
    },

    async getAll(movieId) {
        return await commentRepository.getAll(movieId)
    },

    async removeById(commentId) {
        return await commentRepository.removeById(commentId);
    }
}