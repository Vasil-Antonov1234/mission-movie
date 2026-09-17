import { prisma } from "../lib/prisma.js"

export default {
    async create(movieId, userId, parsedData) {
        return await prisma.review.create({
            data: {
                movieId,
                userId,
                cinematographyScore: parsedData.cinematographyScore,
                performanceScore: parsedData.performanceScore,
                screenplayScore: parsedData.screenplayScore,
                directorScore: parsedData.directorScore,
                review: parsedData.content
            }
        });
    }
}