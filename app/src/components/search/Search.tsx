import { Activity } from "react";
import useFetch from "../../hooks/useFetch";
import type { Actor, Movie } from "../../types/types";
import MovieCard from "../trending/MovieCard";
import styles from "./Search.module.css";
import { Link, useLocation } from "react-router"
import CastCardSmall from "../cast/CastCardSmall";

type Search = {
    searchQuery: string
}

export default function Search() {

    const searchQuery: Search = useLocation().state;

    const { data: movies } = useFetch<Movie[]>(`/search/movies?search=search%3D%22${searchQuery.searchQuery}%22`, []);
    const { data: actors } = useFetch<Actor[]>(`/search/actors?search=search%3D%22${searchQuery.searchQuery}%22`);

    return (
        <section className={styles["trending-section"]}>
            <div>
                <h1 className={styles["section-heading-title"]}>Results for {searchQuery.searchQuery}</h1>
            </div>

            {/* Movies */}
            <section className={styles["trending-wrapper"]}>
                <div className={styles["section-label"]}>Movies</div>
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
                <Activity mode={movies && movies.length ? "hidden" : "visible"}>
                    <section className={styles["trending-wrapper"]}>
                        <h2 className={styles["no-movies"]}>Nothing found</h2>
                    </section>
                </Activity>
            </section>

            {/* Actors */}
            <section className={styles["trending-wrapper"]}>
                <div className={styles["section-label"]}>Actors</div>
                <div className={styles["trending-container"]}>
                    {actors?.map((actor) => (
                        <CastCardSmall
                            key={actor.id}
                            id={String(actor.id)}
                            firstName={actor.firstName}
                            lastName={actor.lastName}
                            imageUrl={actor.imageUrl ? actor.imageUrl : ""}
                        />
                    ))}
                </div>
                <Activity mode={actors && actors.length ? "hidden" : "visible"}>
                    <section className={styles["trending-wrapper"]}>
                        <h2 className={styles["no-movies"]}>Nothing found</h2>
                    </section>
                </Activity>
            </section>

            {/* Directors */}
            <section className={styles["trending-wrapper"]}>
                <div className={styles["section-label"]}>Directors</div>
                <div className={styles["film-titles-container"]}>
                    <span className={styles["director-name"]}>John Doe</span>
                    <span className={styles["director-of-films"]}> director of: </span>
                    <Link to="/" className={styles["film-title"]}>Howse of the dragon</Link>
                    <Link to="/" className={styles["film-title"]}>Breaking bad</Link>
                    <Link to="/" className={styles["film-title"]}>Spider-man: Brand New Day</Link>
                </div>
                <Activity mode={actors && actors.length ? "hidden" : "visible"}>
                    <section className={styles["trending-wrapper"]}>
                        <h2 className={styles["no-movies"]}>Nothing found</h2>
                    </section>
                </Activity>
            </section>


        </section>
    );
}