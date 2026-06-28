import type { Movie } from "../types/types";

export function filterMoviesHandler(allMovies: Movie[], currentPage: number) {
    const filteredMovies = allMovies.filter((x) => allMovies.indexOf(x) < currentPage * 10 && allMovies.indexOf(x) >= (currentPage * 10) - 10);

    return filteredMovies;
}