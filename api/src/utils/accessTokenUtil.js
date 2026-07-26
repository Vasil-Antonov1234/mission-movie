import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export default {
    generate(user) {
    
        const payload = {
            id: user.id,
            email: user.email
        };
    
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
    },

    async invalidate(token) {
        await prisma.token.create({
            data: {
                token
            }
        });
    },

    async check(token) {
        const invalidToken = await prisma.token.findUnique({
            where: {
                token
            }
        })

        if (invalidToken) {
            throw new Error("Invalid Token");
        };
    }
}
