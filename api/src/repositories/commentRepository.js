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
    },

    async getAll(movieId) {
        return await prisma.comment.findMany({
            where: {
                movieId
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        });
    }
}