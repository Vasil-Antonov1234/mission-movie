import userRepository from "../repositories/userRepository.js"
import bcrypt from "bcrypt";
import accessTokenUtil from "../utils/accessTokenUtil.js";
import movieRepository from "../repositories/movieRepository.js";

export default {
    async register(userData) {

        const user = await userRepository.register(userData);
                
        const token = accessTokenUtil.generate(user);

        return { user, token };
    },

    async changePassword(userId, newHashedPassword, oldPassword, email) {
        const user = await userRepository.fondByEmail(email);
        
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid user or password");
        };

        return await userRepository.changePassword(userId, newHashedPassword);
    },

    async login(email, password) {
        const user = await userRepository.fondByEmail(email);

        if (!user) {
            throw new Error("Invalid user or password");
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid user or password");
        };

        const token = accessTokenUtil.generate(user);

        return { user, token };
    },

    async getAddedFilmsCount(userId) {
        return await movieRepository.getAddedFilmsCount(userId);
    },

    async edit(userId, data) {
        return userRepository.edit(userId, data);
    },

    async remove(userId) {
        return await userRepository.remove(userId);
    }
}