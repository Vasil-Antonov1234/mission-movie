import { prisma } from "../lib/prisma.js";

export default {
    async createOne(movieData) {
        return await prisma.movie.create({
            data: movieData
        });
    },

    async getAll() {
        return await prisma.movie.findMany({
            select: {
                poster: true,
                title: true,
                genre: true,
                year: true,
                rating: true,
                id: true,
                authorId: true
            }
        });
    },

    async getById(movieId) {
        return await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });
    }
}