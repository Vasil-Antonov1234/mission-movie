import { prisma } from "../lib/prisma"

export default {
    async create(userId, movieId, content) {
        return await prisma.comment.create({
            data: {
                content,
                userId,
                movieId
            }
        })
    }
}