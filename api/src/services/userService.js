import userRepository from "../repositories/userRepository.js"
import jwt from "jsonwebtoken";

export default {
    async register(userData) {

        const user = await userRepository.register(userData);
        
        const payload = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        return { user, token };
    }
}