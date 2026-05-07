import MovieCard from "./MovieCard";
import styles from "./Trending.module.css"

type Trending = {
    id: number,
    title: string,
    year: number,
    rating: number,
    genre: string,
    poster: string
}

const TRENDING: Trending[] = [
    {
        id: 1,
        title: "Oppenheimer",
        year: 2023,
        rating: 8.9,
        genre: "Drama",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
    },
    {
        id: 2,
        title: "Poor Things",
        year: 2023,
        rating: 8.0,
        genre: "Fantasy",
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80",
    },
    {
        id: 3,
        title: "The Zone of Interest",
        year: 2023,
        rating: 7.4,
        genre: "War / Drama",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    },
    {
        id: 4,
        title: "Past Lives",
        year: 2023,
        rating: 7.9,
        genre: "Romance",
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80",
    },
    {
        id: 5,
        title: "Fallen Leaves",
        year: 2023,
        rating: 7.5,
        genre: "Comedy",
        poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
];

// type Rating = {rating: number}

// function RatingBadge({ rating }: Rating) {
//     return <span className={styles["rating-badge"]}>★ {rating}</span>;
// }

export default function Trending() {
    return (
        <section className={styles["trending-section"]}>
            <div className={styles["section-header"]}>
                <div>
                    <div className={styles["section-label section-label--spaced"]}>Trending now</div>
                    <h2 className={styles["section-heading"]}>Films everyone's talking about</h2>
                </div>
                <a href="#" className={styles["section-link"]}>View all →</a>
            </div>
            <div className={styles["trending-grid"]}>
                {TRENDING.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                    // <div key={movie.id} className={styles["movie-card"]}>
                    //     <div className={styles["movie-card-img-wrapper"]}>
                    //         <img src={movie.poster} alt={movie.title} className={styles["movie-card-img"]} />
                    //         <div className={styles["movie-card-rank"]}>#{index + 1}</div>
                    //     </div>
                    //     <div className={styles["movie-card-body"]}>
                    //         <div className={styles["movie-card-genre"]}>{movie.genre}</div>
                    //         <div className={styles["movie-card-title"]}>{movie.title}</div>
                    //         <div className={styles["movie-card-footer"]}>
                    //             <span className={styles["movie-card-year"]}>{movie.year}</span>
                    //             <RatingBadge rating={movie.rating} />
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
        </section>
    );
}