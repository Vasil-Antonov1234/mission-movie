import castRepository from "../repositories/castRepository.js"
import { attachCastSchema } from "../schemas/attachCastSchema.js";

export default {
    async createOne(castData, authorId) {
        return await castRepository.createOne(castData, authorId);
    },

    async getAll(movieId) {
        return await castRepository.getAll(movieId);
    },

    async getSelected(excludedCastIds) {
        return await castRepository.getSelected(excludedCastIds);
    },

    async attach(castData) {
        castData.cast = Number(castData.cast);
        castData.movieId = Number(castData.movieId);
        
        const parsedCastData = await attachCastSchema.parseAsync(castData);

        return await castRepository.attach(parsedCastData);
    },

    async getById(castId) {
        return await castRepository.getById(castId);
    }
}