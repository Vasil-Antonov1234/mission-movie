import type { Movie } from "../../types/component.types";
import MovieCard from "../trending/MovieCard";
import styles from "./AllMovies.module.css";

const allTrendings: Movie[] = [
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
    {
        id: 6,
        title: "Oppenheimer",
        year: 2023,
        rating: 7.1,
        genre: "Drama",
        poster: "https://m.media-amazon.com/images/I/91L+jiIFA3L.jpg",
        position: 6
    },
    {
        id: 7,
        title: "Avengers: Doomsday",
        year: 2026,
        rating: 7.0,
        genre: "Action, Adventure,",
        poster: "https://m.media-amazon.com/images/M/MV5BM2E1ZTJiZTgtZGI2Zi00MzAxLThhZjktMmU3M2E3Yzk3NjUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        position: 7
    },
    {
        id: 8,
        title: "The Odyssey",
        year: 2026,
        rating: 7.0,
        genre: "Adventure",
        poster: "https://posterspy.com/wp-content/uploads/2025/07/Poster-Teaser-The-Odyssey-Grievity-V4-PS.jpg",
        position: 8
    },
    {
        id: 9,
        title: "Harry Potter",
        year: 2002,
        rating: 6.9,
        genre: "Fantasy, Adventure",
        poster: "https://m.media-amazon.com/images/I/812I8sAkROS.jpg",
        position: 9
    },
    {
        id: 10,
        title: "Mortal Kombat",
        year: 2023,
        rating: 6.7,
        genre: "Fantasy, Action",
        poster: "https://m.media-amazon.com/images/M/MV5BNmRmN2I5M2EtNDA1Ny00N2ZmLWE3YWYtMjQ1NTFjY2Q4NWM5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        position: 10
    },
    {
        id: 11,
        title: "From",
        year: 2024,
        rating: 6.5,
        genre: "Horror",
        poster: "https://filmizip.com/uploads/posts/2026-04/ltlz5ihlpaxqstxgmmbehfniskz.webp",
        position: 11
    }
]

export default function AllMovies() {
    return (
        <section className={styles["trending-section"]}>
            <div>
                {/* <h2 className={styles["section-heading"]}>Films everyone's talking about</h2> */}
                <h1 className={styles["section-heading-title"]}>Whatch new titles</h1>
            </div>
            <div className={styles["trending-container"]}>
                {allTrendings.map((movie: Movie) => (
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
        </section>
    )
}