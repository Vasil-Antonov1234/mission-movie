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

    async getFilmography(castId) {
        return await prisma.$queryRaw`
        SELECT 
	        m.id, m.title, m.director, m.year, m.rating, m.poster
        FROM movies as m
        JOIN movies_casts as mc
        ON m.id = mc."movieId"
        WHERE mc."castId" = ${castId}
        `
    },

    async getById(movieId, filter) {

        if (filter && Object.keys(filter).length > 0) {
            return await prisma.movie.findUnique({
                where: {
                    id: movieId
                },
                select: filter
            });
        };

        return await prisma.movie.findUnique({
            where: {
                id: movieId
            },
            include: {
                author: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                    }
                },
                casts: {
                    include: {
                        cast: true
                    }
                }
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
                boxOffice: parsedMovieData.boxOffice,
                budget: parsedMovieData.budget,
                casts: parsedMovieData.cast,
                country: parsedMovieData.country,
                director: parsedMovieData.director,
                duration: parsedMovieData.duration,
                genre: parsedMovieData.genre,
                language: parsedMovieData.language,
                poster: parsedMovieData.poster,
                releaseDate: parsedMovieData.releaseDate,
                studio: parsedMovieData.studio,
                synopsis: parsedMovieData.synopsis,
                tagline: parsedMovieData.tagline,
                title: parsedMovieData.title,
                trailerUrl: parsedMovieData.trailerUrl,
                writtenBy: parsedMovieData.writtenBy,
                year: parsedMovieData.year
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
    },

    async getLatest() {
        return await prisma.$queryRaw`
        SELECT
	*
    FROM movies
    WHERE "rating" > 8
    ORDER BY "createdAt" DESC
    LIMIT 5;`;
    },

    async unAttach(castId, movieId) {
        const movieId_castId = `${movieId}_${castId}`;

        return await prisma.movieCast.delete({
            where: {
                castId: castId,
                movieId: movieId,
                movieId_castId: {
                    movieId,
                    castId
                }
            }
        });
    }
}