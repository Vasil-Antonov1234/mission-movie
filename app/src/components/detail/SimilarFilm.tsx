import { Link } from "react-router";
import type { Movie } from "../../types/types";
import styles from "./SimilrFilm.module.css";

type RatingBadgeProps = { rating: number, large?: boolean }

function RatingBadge({ rating, large = false }: RatingBadgeProps) {
    return (
        <span className={`${styles["rating-badge"]} ${large ? " rating-badge--large" : ""}`}>
            ★ {rating}
        </span>
    );
}

type SimilarFilmProps = { film: Movie };

export default function SiilarFilm({ film }: SimilarFilmProps) {
    return (
        <div className={styles["similar-item"]}>
            <Link to={`/movies/${film.id}/details`}>
                <img src={film.poster} alt={film.title} className={styles["similar-item-img"]} />
            </Link>
            <div className={styles["similar-item-info"]}>
                <div className={styles["similar-item-title"]}>{film.title}</div>
                <div className={styles["similar-item-year"]}>{film.year}</div>
                <RatingBadge rating={film.rating} />
            </div>
        </div>
    );
}