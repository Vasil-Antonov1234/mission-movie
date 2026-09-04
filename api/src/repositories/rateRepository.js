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
        WHERE ${movieId} = 2;
        `
    }
}