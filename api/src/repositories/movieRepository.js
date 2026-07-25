import { prisma } from "../lib/prisma.js";

export default {
    async createOne(movieData) {
        return await prisma.movie.create({
            data: movieData
        });
    },

    async getAll() {
        return await prisma.movie.findMany();
    },

    async getById(movieId) {
        return await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });
    }
}