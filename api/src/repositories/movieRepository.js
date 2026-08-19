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
                authorId: userId
            }
        });
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
        });
    },

    async getSimilar(filter) {
        const pattern1 = `%${filter.genre}%`;
        const pattern2 = `%${filter.genre1}%`;
        const movieId = filter.movieId;

        return await prisma.$queryRaw`
        SELECT 
	        id, title, year, poster, rating 
        FROM movies
        WHERE genre LIKE ${pattern1} 
        AND genre LIKE ${pattern2}
        AND id <> ${movieId}
        LIMIT 3`;
    }
}