import type { Movie } from "../types/types";

export function filterMoviesHandler(allMovies: Movie[], currentPage: number) {
    let filteredMovies = allMovies.sort((a, b) => {
        return b.rating - a.rating
    });
    
    filteredMovies = allMovies.filter((x) => allMovies.indexOf(x) < currentPage * 20 && allMovies.indexOf(x) >= (currentPage * 20) - 20);

    return filteredMovies;
}