import { prisma } from "../lib/prisma.js";

export default {
    async register(userData) {

        try {
            const user = await prisma.user.create({
                data: userData
            })

            return user;
        } catch (error) {
            throw error;            
        };

    },

    async fondByEmail(email) {
        
        try {
            return await prisma.user.findUnique({
                where: { email }
            });
        } catch (error) {
            throw error
        }
        
    }
}