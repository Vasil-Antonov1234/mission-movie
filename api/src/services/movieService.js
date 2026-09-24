import movieRepository from "../repositories/movieRepository.js"

export default {
    async create(movieData, userId) {
        return await movieRepository.createOne(movieData, userId);
    },

    async getAll(filter) {

        // /movies?where=activePage%3D%22${activePage}%22&where=genre%3D%22${activeGenre}%22
        if (filter.query.authorId) {
            filter.query.authorId = Number(filter.query.authorId);
        };
        
        if (filter.query.year) {
            filter.query.year = Number(filter.query.year);
        };
        
        if (filter.query.rating) {
            filter.query.rating = Number(filter.query.rating);
        };
        
        if (filter.query.id) {
            filter.query.id = Number(filter.query.id);
        };
        
        if (filter.query.activePage && filter.query.activePage !== "null") {
            filter.query.activePage = Number(filter.query.activePage);
        };
        
        if (!filter.query.activePage || filter.query.activePage !== "null") {
            filter.query.activePage = 1;
        };
        
        if (!filter.query.genre || (filter.query.genre).toLowerCase() === "all") {
            filter.query.genre = "";
        };
        
        return await movieRepository.getAll(filter);
    },

    async getAllExcludingReviewed(userId) {
        return await movieRepository.getAllExcludingReviewed(userId);
    },

    async getById(movieId, filter) {

        const movie = await movieRepository.getById(movieId, filter);

        // if (!movie) {
        //     throw new Error("This movie does not exists in the database");
        // };

        return movie;
    },

    async incrementViews(movieId) {
        return await movieRepository.incrementViews(movieId);
    },

    async removeById(movieId, userId, isAdmin) {
        const movie = await movieRepository.getById(movieId);

        if (!movie) {
            throw new Error("Movie not found");
        };

        if (isAdmin) {
            return await movieRepository.removeByIdByAdmin(movieId);
        };

        if (movie.authorId !== userId) {
            throw new Error("Unauthorized");
        };

        return await movieRepository.removeById(movieId, userId)
    },

    async updateOne(movieId, userId, parsedMovieData, isAdmin) {
        const movie = await movieRepository.getById(movieId);

        if (!movie) {
            throw new Error("Movie not found");
        };

        if (isAdmin) {
            return await movieRepository.updateOneByAdmin(movieId, parsedMovieData);
        };

        if (movie.authorId !== userId) {
            throw new Error("Unauthorized");
        };

        return await movieRepository.updateOne(movieId, userId, parsedMovieData);
    },

    async getSimilar(filter) {
        filter.movieId = Number(filter.movieId);

        return await movieRepository.getSimilar(filter);
    },

    async getLatest(filter) {
        
        if (!filter.genre || filter.genre === "All") {
            filter.genre = "";
        };
        
        return await movieRepository.getLatest(filter);
    },

    async getFilmography(castId) {
        return await movieRepository.getFilmography(castId);
    },

    async unAttach(castId, movieId, userId) {
        const movie = await movieRepository.getById(movieId);

        if (movie.authorId !== userId) {
            throw ("Unauthorised");
        };
        
        return await movieRepository.unAttach(castId, movieId);
    },

    async getFeatured() {
        return await movieRepository.getFeatured();
    },

    async getAllCount() {
        return await movieRepository.getAllCount();
    },

    async addToFavourites(movieId, userId) {
        return await movieRepository.addToFavourites(movieId, userId);
    },

    async getIsFavourite(movieId, userId) {
        return await movieRepository.getIsFavourite(movieId, userId);
    },

    async addToWatchlist(movieId, userId) {
        return await movieRepository.addToWatchlist(movieId, userId);
    },

    async getIsInWatchlist(movieId, userId) {
        return await movieRepository.getIsInWatchlist(movieId, userId);
    }
}