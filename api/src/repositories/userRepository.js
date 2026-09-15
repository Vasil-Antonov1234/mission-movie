import { prisma } from "../lib/prisma.js";

export default {
    async register(userData) {

        try {
            const user = await prisma.user.create({
                data: userData
            })

            return user;
        } catch (error) {
            throw error;
        };

    },

    async fondByEmail(email) {

        try {
            return await prisma.user.findUnique({
                where: { email }
            });
        } catch (error) {
            throw error
        }
    },

    async edit(userId, data) {
        return await prisma.user.update({
            data,
            where: {
                id: userId
            }
        });
    },

    async changePassword(userId, newHashedPassword) {
        return await prisma.user.update({
            data: {
                password: newHashedPassword
            },
            where: {
                id: userId
            }
        });
    },

    async remove(userId) {
        return await prisma.user.delete({
            where: {
                id: userId
            }
        });
    },

    async getFavoriteMovies(userId) {
        return await prisma.favorites.findMany({
            where: {
                userId
            },
            include: {
                movie: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });
    },

    async removeFromFavorite(movieId, userId) {
        return await prisma.favorites.delete({
            where: {
                movieId_userId: {
                    movieId,
                    userId
                }
            }
        });
    },

    async getWatchlist(userId) {
        return await prisma.watchlist.findMany({
            where: {
                userId
            }
        });
    }
}