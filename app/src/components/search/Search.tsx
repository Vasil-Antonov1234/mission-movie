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

type Director = {
    id: string,
    director: string,
    title: string
};

export default function Search() {

    const searchQuery: Search = useLocation().state;

    const { data: movies } = useFetch<Movie[]>(`/search/movies?search=search%3D%22${searchQuery.searchQuery}%22`, []);
    const { data: actors } = useFetch<Actor[]>(`/search/actors?search=search%3D%22${searchQuery.searchQuery}%22`, []);
    const { data: directors } = useFetch<Director[]>(`/search/directors?search=search%3D%22${searchQuery.searchQuery}%22`, []);

    return (
        <section className={styles["trending-section"]}>
            <div>
                <h1 className={styles["section-heading-title"]}>Results for "{searchQuery.searchQuery}"</h1>
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
                {directors?.map((x) =>
                    <div key={x.id} className={styles["film-titles-container"]}>
                        <span className={styles["director-name"]}>{x.director}</span>
                        <span className={styles["director-of-films"]}> director of: </span>
                        <Link to={`/movies/${x.id}/details`} className={styles["film-title"]}>{x.title}</Link>
                    </div>
                )}
                <Activity mode={directors && directors.length ? "hidden" : "visible"}>
                    <section className={styles["trending-wrapper"]}>
                        <h2 className={styles["no-movies"]}>Nothing found</h2>
                    </section>
                </Activity>
            </section>

            {/* Users */}
            <section className={styles["trending-wrapper"]}>
                <div className={styles["section-label"]}>Users</div>
                <Link to={"#"} className={`${styles["director-name"]} ${styles["user-name"]}`}>User one</Link>
                <Link to={"#"} className={`${styles["director-name"]} ${styles["user-name"]}`}>User two</Link>
                <Link to={"#"} className={`${styles["director-name"]} ${styles["user-name"]}`}>User three</Link>
                {/* {directors?.map((x) =>
                    <div key={x.id} className={styles["film-titles-container"]}>
                        <span className={styles["director-name"]}>{x.director}</span>
                        <span className={styles["director-of-films"]}> director of: </span>
                        <Link to={`/movies/${x.id}/details`} className={styles["film-title"]}>{x.title}</Link>
                    </div>
                )} */}
                {/* <Activity mode={directors && directors.length ? "hidden" : "visible"}>
                    <section className={styles["trending-wrapper"]}>
                        <h2 className={styles["no-movies"]}>Nothing found</h2>
                    </section>
                </Activity> */}
            </section>

        </section>
    );
}