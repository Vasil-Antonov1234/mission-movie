import type { Movie } from "../../types/component.types";
import MovieCard from "./MovieCard";
import styles from "./Trending.module.css"
import { Link } from "react-router";


const trending: Movie[] = [
    {
        id: 1,
        title: "Spider-Man",
        year: 2002,
        rating: 8.9,
        genre: "Adventure",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
        position: 1
    },
    {
        id: 2,
        title: "Poor Things",
        year: 2023,
        rating: 8.0,
        genre: "Fantasy",
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80",
        position: 2
    },
    {
        id: 3,
        title: "The Zone of Interest",
        year: 2023,
        rating: 7.4,
        genre: "War / Drama",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
        position: 3
    },
    {
        id: 4,
        title: "Past Lives",
        year: 2023,
        rating: 7.9,
        genre: "Romance",
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80",
        position: 4
    },
    {
        id: 5,
        title: "Fallen Leaves",
        year: 2023,
        rating: 7.5,
        genre: "Comedy",
        poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        position: 5
    },
];

export default function Trending() {
    return (
        <section className={styles["trending-section"]}>
            <div className={styles["section-header"]}>
                <div>
                    <div className={`${styles["section-label"]} ${styles["section-label--spaced"]}`}>Trending now</div>
                    <h2 className={styles["section-heading"]}>Films everyone's talking about</h2>
                </div>
                <Link to="/catalog" className={`${styles["section-link"]} ${styles["section-link-top"]}`}>View all →</Link>
            </div>
            <div className={styles["trending-container"]}>
                {trending.map((movie: Movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        year={movie.year}
                        rating={movie.rating}
                        genre={movie.genre}
                        poster={movie.poster}
                        position={movie.position}
                    />
                ))}
            </div>
            <Link to="/catalog" className={`${styles["section-link"]} ${styles["section-link-bottom"]}`}>View all →</Link>
        </section>
    );
}