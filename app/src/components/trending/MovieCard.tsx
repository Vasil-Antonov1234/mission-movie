import styles from "./MovieCard.module.css";

type Rating = { rating: number }

function RatingBadge({ rating }: Rating) {
    return <span className={styles["rating-badge"]}>★ {rating}</span>;
}

type Movie = {
    id: number,
    title: string,
    year: number,
    rating: number,
    genre: string,
    poster: string,
    position: number
}

export default function MovieCard(
    movie: Movie
) {
    
    return (
        <div key={movie.id} className={styles["movie-card"]}>
            <div className={styles["movie-card-img-wrapper"]}>
                <img src={movie.poster} alt={movie.title} className={styles["movie-card-img"]} />
                <div className={styles["movie-card-rank"]}>#{movie.position}</div>
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