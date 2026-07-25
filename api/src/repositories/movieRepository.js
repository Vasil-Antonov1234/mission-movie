import { prisma } from "../lib/prisma.js";

export default {
    async createOne(movieData) {
        return await prisma.movie.create({
            data: movieData
        });
    }
}