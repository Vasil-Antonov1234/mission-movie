import { prisma } from "../lib/prisma.js"

export default {
    async create(movieId, userId, content) {
        return await prisma.review.create({
            data: {
                movieId,
                userId,
                review: content
            }
        });
    }
}