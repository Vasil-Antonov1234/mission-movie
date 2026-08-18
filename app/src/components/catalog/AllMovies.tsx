import PaginationContainer from "../pagination/PaginationContainer";
import SelectionFilter from "../trending/SelectionFilter";
import MovieCard from "../trending/MovieCard";
import styles from "./AllMovies.module.css";
import { Activity, useState } from "react";
import filterRecordsHandler from "../../utils/filterRecordsHandler";
import useFetch from "../../hooks/useFetch";

const paginationCount = [1, 2, 3];
const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary"];

export default function AllMovies() {
    const [activePage, setActivePage] = useState(1);
    const [activeGenre, setActiveGenre] = useState("All");

    const { data } = useFetch("/movies", [], true);

    const movies = data && Array.isArray(data) ? data : [];

    let filteredMovies = filterRecordsHandler.filterByGenre(movies, activeGenre);

    filteredMovies = filterRecordsHandler.filterMoviesByPage(filteredMovies, activePage);

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
                        {/* {filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            year={movie.year}
                            rating={movie.rating}
                            genre={movie.genre}
                            poster={movie.poster}
                            position={allMovies.indexOf(movie) + 1}
                        />
                    ))} */}
                    </div>
                </section>
            </Activity>
            <Activity mode={filteredMovies && filteredMovies.length > 0 ? "hidden" : "visible"}>
                <h2 className={styles["no-movies"]}>Nothing here yet</h2>
            </Activity>
            <PaginationContainer count={paginationCount} onPageNumber={pageNumberHandler} />
        </section>
    )
}