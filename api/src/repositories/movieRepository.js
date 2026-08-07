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
            where: filter.query,
            select: filter.select
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