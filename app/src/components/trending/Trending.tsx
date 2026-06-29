import type { Trending } from "../../types/types";
import MovieCard from "./MovieCard";
import styles from "./Trending.module.css";
import { Link } from "react-router";

export default function Trending(
    props: Trending
) {
    return (
        <section className={styles["trending-section"]}>
            <div className={styles["section-header"]}>
                <div>
                    <div className={`${styles["section-label"]} ${styles["section-label--spaced"]}`}>Trending now</div>
                    <h2 className={styles["section-heading"]}>Films everyone's talking about</h2>
                </div>
                <Link to="/catalog/movies" className={`${styles["section-link"]} ${styles["section-link-top"]}`}>View all →</Link>
            </div>
            <div className={styles["trending-container"]}>
                {props.trending.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        year={movie.year}
                        rating={movie.rating}
                        genre={movie.genre}
                        poster={movie.poster}
                        position={props.trending.indexOf(movie) + 1}
                    />
                ))}
            </div>
            <Link to="/catalog/movies" className={`${styles["section-link"]} ${styles["section-link-bottom"]}`}>View all →</Link>
        </section>
    );
}