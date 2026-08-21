import castRepository from "../repositories/castRepository.js"

export default {
    async createOne(castData) {
        return await castRepository.createOne(castData);
    }
}