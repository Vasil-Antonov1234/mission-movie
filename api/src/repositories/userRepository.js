import { prisma } from "../lib/prisma.js";

export default {
    async register(userData) {

        try {
            const user = await prisma.user.create({
                data: {
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    password: userData.password,
                    role: userData.role
                }
            })

            return user;
        } catch (error) {
            throw error;
        };

    },

    async findByEmail(email) {

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

    async removeFromWatchlist(movieId, userId) {
        return await prisma.watchlist.delete({
            where: {
                movieId_userId: {
                    movieId,
                    userId
                }
            }
        });
    },

    async getAll() {
        return await prisma.user.findMany({
            where: {
                role: {
                    not: "ADMIN"
                }
            }
        });
    },

    async getById(userId) {
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    },

    async getBySearch(search) {
        const searchQuery = `%${search}%`

        return await prisma.$queryRaw`
        SELECT 
	        id, "firstName", "lastName", email
        FROM users
        WHERE "firstName" ILIKE ${searchQuery} OR "lastName" ILIKE ${searchQuery}
        `
    },

    async getTopUsers() {
        return await prisma.$queryRaw`
        SELECT
	        u.id, 
	        u."firstName", 
	        u."lastName", 
	        u.email,
	        COUNT(DISTINCT m.id) AS "addedMovies",
	        COUNT(DISTINCT r.id) AS "writtenReviews",
	        COUNT(DISTINCT m.id) + COUNT(DISTINCT r.id) AS "totalCount"
        FROM users as u
        LEFT JOIN movies as m
        ON u.id = m."authorId"
        LEFT JOIN reviews as r
        ON u.id = r."userId"
        GROUP BY u.id, u."firstName", u."lastName", u.email
        ORDER BY "totalCount" DESC
        LIMIT 3
        `
    },

    async uploadAvatar(userId, avatarUrl) {
        return await prisma.user.update({
            data: {
                avatarUrl
            },
            where: {
                id: userId
            }
        });
    }
}