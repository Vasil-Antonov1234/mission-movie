import movieRepository from "../repositories/movieRepository.js"

export default {
    async movies(search) {
        return await movieRepository.getSearch(search);
    }
}