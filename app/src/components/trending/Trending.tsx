import type { Trending } from "../../types/types";
import MovieCard from "./MovieCard";
import styles from "./Trending.module.css";
import theme from "../Theme.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Trending(props: Trending) {
    const { isDarkTheme } = useContext(UserContext);
    
    return (
        <section className={styles["trending-section"]}>
            <div className={styles["section-header"]}>
                <div>
                    <div className={`${styles["section-label"]} ${styles["section-label--spaced"]} ${!isDarkTheme ? theme["pageEyebrow"] : ""}`}>Trending now</div>
                    <h2 className={`${styles["section-heading"]} ${!isDarkTheme ? theme["text"] : ""}`}>Films everyone's talking about</h2>
                </div>
                <Link to="/movies/catalog" className={`${styles["section-link"]} ${styles["section-link-top"]} ${!isDarkTheme ? theme["pageEyebrow"] : ""}`}>View all →</Link>
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
                        addStyle="add-height"
                    />
                ))}
            </div>
            <Link to="/catalog/movies" className={`${styles["section-link"]} ${styles["section-link-bottom"]}`}>View all →</Link>
        </section>
    );
}