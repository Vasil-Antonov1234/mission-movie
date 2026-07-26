import { prisma } from "../lib/prisma.js";

export default {
    async createOne(movieData, userId) {
        return await prisma.movie.create({
            data: {
                ...movieData,
                authorId: userId
            }
        });
    },

    async getAll(filter) {
        return await prisma.movie.findMany({
            where: filter,
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
    },

    async removeById(movieId, userId) {
        return await prisma.movie.delete({
            where: {
                id: movieId,
                authorId : userId
            }
        })
    },

    async updateOne(movieId, userId, parsedMovieData) {        
        return await prisma.movie.update({
            where: {
                id: movieId,
                authorId: userId
            },
            data: {
                ...parsedMovieData
            }
        })
    }
}