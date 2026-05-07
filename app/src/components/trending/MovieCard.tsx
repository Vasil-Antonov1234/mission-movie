import styles from "./MovieCard.module.css";

type Rating = { rating: number }

function RatingBadge({ rating }: Rating) {
    return <span className={styles["rating-badge"]}>★ {rating}</span>;
}

export default function MovieCard({
    movie,
    index
}) {
    return (
        <div key={movie.id} className={styles["movie-card"]}>
            <div className={styles["movie-card-img-wrapper"]}>
                <img src={movie.poster} alt={movie.title} className={styles["movie-card-img"]} />
                <div className={styles["movie-card-rank"]}>#{index + 1}</div>
            </div>
            <div className={styles["movie-card-body"]}>
                <div className={styles["movie-card-genre"]}>{movie.genre}</div>
                <div className={styles["movie-card-title"]}>{movie.title}</div>
                <div className={styles["movie-card-footer"]}>
                    <span className={styles["movie-card-year"]}>{movie.year}</span>
                    <RatingBadge rating={movie.rating} />
                </div>
            </div>
        </div>
    );
}