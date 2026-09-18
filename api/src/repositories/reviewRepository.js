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
    },

    async getAll() {
        return await prisma.review.findMany({
            include: {
                movie: {
                    select: {
                        id: true,
                        title: true,
                        poster: true
                    }
                },
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        id: true,
                        email: true
                    }
                }
            }
        });
    },

    async getById(reviewId) {
        return await prisma.review.findUnique({
            where: {
                id: reviewId
            },
            include: {
                movie: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        id: true,
                        email: true
                    }
                }
            }
        });
    }
}