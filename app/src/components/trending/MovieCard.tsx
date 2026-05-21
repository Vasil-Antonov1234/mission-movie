import type { Movie, Rating } from "../../types/component.types";
import styles from "./MovieCard.module.css";
import { Link } from "react-router";

function RatingBadge({ rating }: Rating) {
    return <span className={styles["rating-badge"]}>★ {rating}</span>;
}

export default function MovieCard(
    movie: Movie
) {

    return (
        <Link to={`/catalog/${movie.id}/details`} className={styles["movie-card"]}>
            <div className={styles["movie-card-img-wrapper"]}>
                <img src={movie.poster} alt={movie.title} className={styles["movie-card-img"]} />
                <div className={styles["movie-card-rank"]}>#{movie.position}</div>
            </div>
            <div className={styles["movie-card-body"]}>
                <div className={styles["movie-card-genre"]}>{movie.genre}</div>
                <div className={styles["movie-card-title"]}>{movie.title}</div>
            </div>
            <div className={styles["movie-card-footer"]}>
                <span className={styles["movie-card-year"]}>{movie.year}</span>
                <RatingBadge rating={movie.rating} />
            </div>
        </Link>
    );
}