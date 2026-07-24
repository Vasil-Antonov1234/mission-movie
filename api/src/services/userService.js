import userRepository from "../repositories/userRepository.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateAccessToken.js";

export default {
    async register(userData) {

        const user = await userRepository.register(userData);
                
        const token = generateAccessToken(user);

        return { user, token };
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

        const token = generateAccessToken(user);

        return { user, token };
    }
}