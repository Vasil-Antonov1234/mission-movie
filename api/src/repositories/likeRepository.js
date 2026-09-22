import { prisma } from "../lib/prisma.js"

export default {
    async createOne(reviewId, userId) {
        return await prisma.like.create({
            data: {
                userId,
                reviewId
            }
        })
    },

    async getHasLicked(reviewId, userId) {
        return await prisma.like.findUnique({
            where: {
                userId_reviewId: {
                    reviewId,
                    userId
                }
            }
        });
    }
}