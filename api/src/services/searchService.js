import castRepository from "../repositories/castRepository.js";
import movieRepository from "../repositories/movieRepository.js"

export default {
    async movies(search) {
        return await movieRepository.getSearch(search);
    },

    async actors(search) {
        return await castRepository.getSearch(search);
    }
}