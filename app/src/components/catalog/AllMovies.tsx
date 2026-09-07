import PaginationContainer from "../pagination/PaginationContainer";
import SelectionFilter from "../trending/SelectionFilter";
import MovieCard from "../trending/MovieCard";
import styles from "./AllMovies.module.css";
import { Activity, useState } from "react";
import filterRecordsHandler from "../../utils/filterRecordsHandler";
import useFetch from "../../hooks/useFetch";
import type { Movie } from "../../types/types";
import { countPages } from "../../utils/pagesCounter";

// const paginationCount = [1, 2, 3];
const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary"];

const initialState: Movie[] = []

export default function AllMovies() {
    const [activePage, setActivePage] = useState(1);
    const [activeGenre, setActiveGenre] = useState("All");

    const { data } = useFetch(`/movies?where=activePage%3D%22${activePage}%22`, initialState);
    const { data: moviesCount } = useFetch("/movies/all/count", "0");

    const paginationCount = moviesCount ? countPages(moviesCount) : 0;


    const movies = data ? data : [];

    const filteredMovies = filterRecordsHandler.filterByGenre(movies, activeGenre);

    // filteredMovies = filterRecordsHandler.filterMoviesByPage(filteredMovies, activePage);

    function pageNumberHandler(page: number | string) {

        setActivePage(Number(page));
    };

    return (
        <section className={styles["trending-section"]}>
            <SelectionFilter
                options={options}
                setSortBy={setActiveGenre}
                activeState={activeGenre}
            />
            <div>
                <h1 className={styles["section-heading-title"]}>Whatch new titles</h1>
            </div>
            <Activity mode={filteredMovies && filteredMovies.length > 0 ? "visible" : "hidden"}>
                <section className={styles["trending-wrapper"]}>
                    <div className={styles["trending-container"]}>
                        {filteredMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                year={movie.year}
                                rating={movie.rating}
                                genre={movie.genre}
                                poster={movie.poster}
                                position={movies.indexOf(movie) + 1}
                            />
                        ))}
                    </div>
                </section>
            </Activity>
            <Activity mode={filteredMovies && filteredMovies.length > 0 ? "hidden" : "visible"}>
                <section className={styles["trending-wrapper"]}>
                    <h2 className={styles["no-movies"]}>Nothing here yet</h2>
                </section>
            </Activity>
            <PaginationContainer count={paginationCount} onPageNumber={pageNumberHandler} />
        </section>
    )
}