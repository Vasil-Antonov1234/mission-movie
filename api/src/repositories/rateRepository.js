import { prisma } from "../lib/prisma"

export default {
    async rateMovie(rating, movieId, userId) {
        return await prisma.rate.create({
            data: {
                currentRate: rating,
                movieId,
                userId
            }
        })
    },

    async getRatesCount(movieId) {
        return await prisma.$queryRaw`
        SELECT
	        COUNT("userId")
        FROM rates
        WHERE "movieId" = ${movieId};
        `
    },

    async getHasRated(userId, movieId) {
        return await prisma.rate.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId
                }
            }
        });
    }
}