import type { Movie, Review } from "../types/types";

export default {
    filterMoviesByPage(allMovies: Movie[], currentPage: number) {
        let filteredMovies = allMovies.sort((a, b) => {
            return b.rating - a.rating
        });
        
        filteredMovies = allMovies.filter((x) => allMovies.indexOf(x) < currentPage * 20 && allMovies.indexOf(x) >= (currentPage * 20) - 20);
    
        return filteredMovies;
    },
    filterReviews(allReviews: Review[], sortBy: string) {

        let filteredReviews = allReviews

        if (sortBy === "All") {
            filteredReviews = allReviews.sort((a, b) => {
                return a.id - b.id;
            });
        };

        if (sortBy === "Latest by year") {
            filteredReviews = allReviews.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        };

        if (sortBy === "Oldest by year") {
            filteredReviews = allReviews.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
        };

        if (sortBy === "Alphabetically") {
            filteredReviews = allReviews.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
        };
        
        return filteredReviews;
    },
    filterByGenre(allMovies: Movie[], activeGenre: string) {
        let filteredMovies = allMovies;

        if (activeGenre !== "All") {
            filteredMovies = allMovies.filter((x) => x.genre.toLocaleLowerCase().includes(activeGenre.toLocaleLowerCase()));
        }
        
        return filteredMovies;
    }
}
