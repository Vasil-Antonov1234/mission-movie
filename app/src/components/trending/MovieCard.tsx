import type { Movie, Rating } from "../../types/types";
import styles from "./MovieCard.module.css";
import theme from "../Theme.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function RatingBadge({ rating }: Rating) {
    return <span className={styles["rating-badge"]}>★ {rating}</span>;
}

export default function MovieCard(movie: Movie) {
    const { isDarkTheme } = useContext(UserContext);   
    return (
        <Link to={`/movies/${movie.id}/details`} className={`${styles["movie-card"]} ${!isDarkTheme ? theme["movieCard"] : ""}`}>
            <div className={styles["movie-card-img-wrapper"]}>
                <img src={movie.poster} alt={movie.title} className={`${styles["movie-card-img"]} ${styles[`${movie.addStyle}`]}`} />
                {/* <div className={styles["movie-card-rank"]}>#{movie.position}</div> */}
            </div>
            <div className={styles["movie-card-body"]}>
                <div className={styles["movie-card-genre"]}>{movie.genre}</div>
                <div className={`${styles["movie-card-title"]} ${!isDarkTheme ? theme["text"] : ""}`}>{movie.title}</div>
            </div>
            <div className={styles["movie-card-footer"]}>
                <span className={styles["movie-card-year"]}>{movie.year}</span>
                <RatingBadge rating={movie.rating} />
            </div>
        </Link>
    );
}