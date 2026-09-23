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

    async getForMovie(movieId) {
        return await prisma.review.findMany({
            where: {
                movieId
            },
            select: {
                id: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                review: true,
                createdAt: true,
                cinematographyScore: true,
                directorScore: true,
                performanceScore: true,
                screenplayScore: true
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
                },
                likes: {
                    select: {
                        userId: true
                    }
                }
            }
        });
    },

    async getLatest() {
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
            },
            take: 3,
            orderBy: {
                createdAt: "desc"
            }
        });
    },

    async getHasWrittenReview(movieId, userId) {
        return await prisma.review.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId
                }
            }
        });
    },

    async hasOwner(movieId, userId, reviewId) {
        return await prisma.review.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId
                },
                id: reviewId
            }
        });
    },

    async getYours(userId) {
        return await prisma.review.findMany({
            where: {
                userId
            },
            include: {
                movie: {
                    select: {
                        title: true
                    }
                }
            }
        });
    },

    async updateOne(userId, movieId, data) {
        return await prisma.review.update({
            where: {
                movieId_userId: {
                    userId,
                    movieId
                }
            },
            data: {
                cinematographyScore: data.cinematographyScore,
                directorScore: data.cinematographyScore,
                performanceScore: data.performanceScore,
                screenplayScore: data.screenplayScore,
                review: data.content
            }
        });
    }
}