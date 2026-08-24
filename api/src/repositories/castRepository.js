import { prisma } from "../lib/prisma.js"

export default {
    async createOne(castData) {
        return await prisma.cast.create({
            data: castData
        });
    },

    async getAll() {
        return await prisma.cast.findMany();
    },

    async attach(parsedCastData) {
        return await prisma.movieCast.create({
            data: {
                castId: parsedCastData.cast,
                movieId: parsedCastData.movieId,
                nameInMovie: parsedCastData.nameInMovie
            }
        });
    }
}