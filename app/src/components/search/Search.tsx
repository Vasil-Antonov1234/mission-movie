import { Activity } from "react";
import useFetch from "../../hooks/useFetch";
import type { Movie } from "../../types/types";
import MovieCard from "../trending/MovieCard";
import styles from "./Search.module.css";
import { useLocation } from "react-router"

type Search = {
    searchQuery: string
}

export default function Search() {

    const searchQuery: Search = useLocation().state;

    const { data: movies } = useFetch<Movie[]>(`/search/movies?search=search%3D%22${searchQuery.searchQuery}%22`, []);

    return (
        <section className={styles["trending-section"]}>
            <div>
                <h1 className={styles["section-heading-title"]}>Results </h1>
            </div>
            <section className={styles["trending-wrapper"]}>
                <div className={styles["trending-container"]}>
                    {movies?.map((movie) => (
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
            <Activity mode={movies && movies.length ? "hidden" : "visible"}>
                <section className={styles["trending-wrapper"]}>
                    <h2 className={styles["no-movies"]}>Nothing found</h2>
                </section>
            </Activity>
        </section>
    );
}