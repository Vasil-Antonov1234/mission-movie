import movieRepository from "../repositories/movieRepository.js"

export default {
    async create(movieData) {
        return await movieRepository.createOne(movieData);
    }
}