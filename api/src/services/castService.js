import castRepository from "../repositories/castRepository.js"
import { attachCastSchema } from "../schemas/attachCastSchema.js";

export default {
    async createOne(castData) {
        return await castRepository.createOne(castData);
    },

    async getAll() {
        return await castRepository.getAll();
    },

    async attach(castData) {
        castData.cast = Number(castData.cast);
        castData.movieId = Number(castData.movieId);
        
        const parsedCastData = await attachCastSchema.parseAsync(castData);

        return await castRepository.attach(parsedCastData);
    }
}