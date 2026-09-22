import { prisma } from "../lib/prisma.js"

export default {
    async createOne(reviewId, userId) {
        return await prisma.like.create({
            data: {
                userId,
                reviewId
            }
        })
    }
}