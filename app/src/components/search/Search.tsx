import MovieCard from "../trending/MovieCard";
import styles from "./Search.module.css";
import { useLocation } from "react-router"

type Search = {
    searchQuery: string
}

export default function Search() {

    const state: Search = useLocation().state;

    return (
        <section className={styles["trending-section"]}>
            <div>
                <h1 className={styles["section-heading-title"]}>Watch new titles</h1>
            </div>
            <section className={styles["trending-wrapper"]}>
                <div className={styles["trending-container"]}>
                    {/* {filteredMovies.map((movie) => (
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
                    ))} */}
                    <MovieCard title="Test" genre="asasa" poster="none"/>
                </div>
            </section>
            {/* <Activity mode={filteredMovies && filteredMovies.length > 0 ? "hidden" : "visible"}>
                <section className={styles["trending-wrapper"]}>
                    <h2 className={styles["no-movies"]}>Nothing here yet</h2>
                </section>
            </Activity> */}
        </section>
    );
}