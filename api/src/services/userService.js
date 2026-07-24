import userRepository from "../repositories/userRepository.js"

export default {
    async register(userData) {
        return await userRepository.register(userData);
    }
}