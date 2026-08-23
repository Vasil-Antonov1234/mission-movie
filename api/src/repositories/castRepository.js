import { prisma } from "../lib/prisma.js"

export default {
    async createOne(castData) {
        return await prisma.cast.create({
            data: castData
        });
    },

    async getAll() {
        return await prisma.cast.findMany();
    }
}