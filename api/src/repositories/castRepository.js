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
	       c.id
        FROM casts as c
        FULL JOIN movies_casts as mc
        ON c.id = mc."castId"
        WHERE mc."movieId" = ${movieId}
        `
    },

    async getSelected(excludedCastIds) {
        return await prisma.cast.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                imageUrl: true
            },
            where: {
                id: {
                    notIn: excludedCastIds
                }
            }
        })
    },

    async attach(parsedCastData) {
        return await prisma.movieCast.create({
            data: {
                castId: parsedCastData.cast,
                movieId: parsedCastData.movieId,
                nameInMovie: parsedCastData.nameInMovie
            }
        });
    },

    async getById(castId) {
        return await prisma.cast.findUnique({
            where: {
                id: castId
            }
        });
    }
}