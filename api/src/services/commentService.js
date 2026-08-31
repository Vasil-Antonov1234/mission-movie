import commentRepository from "../repositories/commentRepository"

export default {
    async create(userId, movieId, content) {
        return await commentRepository.create(userId, movieId, content);
    },

    async getAll(movieId) {
        return await commentRepository.getAll(movieId)
    }
}