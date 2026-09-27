import castRepository from "../repositories/castRepository.js";
import movieRepository from "../repositories/movieRepository.js"
import userRepository from "../repositories/userRepository.js";

export default {
    async movies(search) {
        return await movieRepository.getSearch(search);
    },

    async actors(search) {
        return await castRepository.getSearch(search);
    },

    async directors(search) {
        return await movieRepository.getDirectors(search);
    },

    async users(search) {
        return await userRepository.getBySearch(search);
    }
}