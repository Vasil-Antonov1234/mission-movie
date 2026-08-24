import { prisma } from "../lib/prisma.js"

export default {
    async createOne(castData) {
        return await prisma.cast.create({
            data: castData
        });
    },

    async getAll(movieId) {
        return await prisma.$queryRaw`
        SELECT
	        *
        FROM casts as c
        JOIN movies_casts as mc
        ON c.id = mc."castId"
        WHERE mc."movieId" != ${movieId}
        `
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