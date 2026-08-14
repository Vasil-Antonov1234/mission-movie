import type { Movie } from "../../types/types";
import PaginationContainer from "../pagination/PaginationContainer";
import SelectionFilter from "../trending/SelectionFilter";
import MovieCard from "../trending/MovieCard";
import styles from "./AllMovies.module.css";
import { Activity, useState } from "react";
import filterRecordsHandler from "../../utils/filterRecordsHandler";
import useFetch from "../../hooks/useFetch";

const allMovies: Movie[] = [
    {
        id: 1,
        title: "Spider-Man",
        year: 2002,
        rating: 9.7,
        genre: "Adventure",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80"
    },
    {
        id: 2,
        title: "Poor Things",
        year: 2023,
        rating: 9.5,
        genre: "Fantasy",
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80"
    },
    {
        id: 3,
        title: "The Zone of Interest",
        year: 2023,
        rating: 9.4,
        genre: "War / Drama",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80"
    },
    {
        id: 4,
        title: "Past Lives",
        year: 2023,
        rating: 9.1,
        genre: "Romance",
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80"
    },
    {
        id: 5,
        title: "Fallen Leaves",
        year: 2023,
        rating: 9.0,
        genre: "Comedy",
        poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
    },
    {
        id: 6,
        title: "Oppenheimer",
        year: 2023,
        rating: 8.7,
        genre: "Drama",
        poster: "https://m.media-amazon.com/images/I/91L+jiIFA3L.jpg"
    },
    {
        id: 7,
        title: "Avengers: Doomsday",
        year: 2026,
        rating: 8.7,
        genre: "Action, Adventure,",
        poster: "https://m.media-amazon.com/images/M/MV5BM2E1ZTJiZTgtZGI2Zi00MzAxLThhZjktMmU3M2E3Yzk3NjUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 8,
        title: "The Odyssey",
        year: 2026,
        rating: 8.5,
        genre: "Adventure",
        poster: "https://posterspy.com/wp-content/uploads/2025/07/Poster-Teaser-The-Odyssey-Grievity-V4-PS.jpg"
    },
    {
        id: 9,
        title: "Harry Potter",
        year: 2002,
        rating: 8.4,
        genre: "Fantasy, Adventure",
        poster: "https://m.media-amazon.com/images/I/812I8sAkROS.jpg"
    },
    {
        id: 10,
        title: "Mortal Kombat",
        year: 2023,
        rating: 8.3,
        genre: "Fantasy, Action",
        poster: "https://m.media-amazon.com/images/M/MV5BNmRmN2I5M2EtNDA1Ny00N2ZmLWE3YWYtMjQ1NTFjY2Q4NWM5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 11,
        title: "From",
        year: 2024,
        rating: 8.3,
        genre: "Horror",
        poster: "https://filmizip.com/uploads/posts/2026-04/ltlz5ihlpaxqstxgmmbehfniskz.webp"
    },
    {
        id: 12,
        title: "The Punisher: One Last Kill",
        year: 2026,
        rating: 8.2,
        genre: "Action, Adventure, Crime",
        poster: "https://lh5.googleusercontent.com/proxy/eRujBnpOiR-aA7O40XV6wzPS48HL9xHK8yME_gPQjVJh--cX98UMKnHdvYSrKg8VI4ej7ySN3rz-Id30O3F46WUThCYSoujsNLi5DJRgAb40"
    },
    {
        id: 13,
        title: "Arctic's Edge",
        year: 2025,
        rating: 8.1,
        genre: "Thriller",
        poster: "https://m.media-amazon.com/images/M/MV5BMDcyYjVhMDItYjg0OS00MTUwLTkzYTgtODBlNDU3MTJmNzRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 14,
        title: "Planet of the Apes",
        year: 2001,
        rating: 7.9,
        genre: "Action, Adventure, Sci-Fi",
        poster: "https://cdng.europosters.eu/pod_public/1300/262747.jpg"
    },
    {
        id: 15,
        title: "Rebel Moon - Part One: A Child of Fire",
        year: 2023,
        rating: 7.8,
        genre: "Action, Adventure",
        poster: "https://m.media-amazon.com/images/M/MV5BYTRmOTk2ZDYtY2Q3Mi00MGYwLWFjNDQtYTliODc3NzM1ZjBlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 16,
        title: "Schindler's List",
        year: 1993,
        rating: 7.4,
        genre: "Drama, History",
        poster: "https://i.pinimg.com/736x/16/dc/f0/16dcf03b7244c896d4c149b250913f0f.jpg"
    },
    {
        id: 17,
        title: "Insidious: The Red Door",
        year: 2023,
        rating: 7.3,
        genre: "Horror, Mystery, Thriller",
        poster: "https://m.media-amazon.com/images/M/MV5BNzUzOGY5ZGQtZGZkMi00YjJkLWJjODktMGNiMmI5YjBkYTVjXkEyXkFqcGc@._V1_.jpg"
    },
    {
        id: 18,
        title: "Close Range",
        year: 2015,
        rating: 7.1,
        genre: "Action, Crime, Thriller",
        poster: "https://m.media-amazon.com/images/M/MV5BNzYyMTA0MzAtYzAwNy00NjhmLTk1ZTMtMzU0YTY2M2I0NWU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 19,
        title: "Escape Plan",
        year: 2013,
        rating: 7.0,
        genre: "Action, Thriller",
        poster: "https://image.tmdb.org/t/p/original/yzYPg7GiB8oZOpT6QTWRVPGaGdC.jpg"
    },
    {
        id: 20,
        title: "The Last Face",
        year: 2013,
        rating: 6.4,
        genre: "Action, Adventure, Drama",
        poster: "https://m.media-amazon.com/images/M/MV5BMTg1NTU3OTcyMF5BMl5BanBnXkFtZTgwMDY5Njc3MDI@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 21,
        title: "Breaking Bad",
        year: 2008,
        rating: 9.5,
        genre: "Thriller, Crime, Drama",
        poster: "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg"
    },
    {
        id: 22,
        title: "Parasite",
        year: 2019,
        rating: 8.5,
        genre: "Thriller, Dark Comedy, Drama",
        poster: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
    },
    {
        id: 23,
        title: "Chernobyl",
        year: 2019,
        rating: 9.3,
        genre: "Thriller, History, Drama",
        poster: "https://m.media-amazon.com/images/I/71LKF6d63FL._AC_UF894,1000_QL80_.jpg"
    },
    {
        id: 24,
        title: "Tom Clancy's Jack Ryan: Ghost War",
        year: 2026,
        rating: 5.7,
        genre: "Thriller, Action, Drama",
        poster: "https://upload.wikimedia.org/wikipedia/en/f/f2/Jack_Ryan%2C_Ghost_War_poster.jpeg"
    }
];

const paginationCount = [1, 2, 3];
const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary"];

export default function AllMovies() {
    const [activePage, setActivePage] = useState(1);
    const [activeGenre, setActiveGenre] = useState("All");

    const { data } = useFetch("/movies", []);

    const test = [];

    let filteredMovies = filterRecordsHandler.filterByGenre(allMovies, activeGenre);

    filteredMovies = filterRecordsHandler.filterMoviesByPage(filteredMovies, activePage);

    function pageNumberHandler(page: number | string) {

        setActivePage(Number(page));
    };

    return (
        <section className={styles["trending-section"]}>
            <SelectionFilter
                options={options}
                setSortBy={setActiveGenre}
                activeState={activeGenre}
            />
            <div>
                <h1 className={styles["section-heading-title"]}>Whatch new titles</h1>
            </div>
            <Activity mode={data && data.length > 0 ? "visible" : "hidden"}>
                <section className={styles["trending-wrapper"]}>
                    <div className={styles["trending-container"]}>
                        {data?.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                year={movie.year}
                                rating={movie.rating}
                                genre={movie.genre}
                                poster={movie.poster}
                                position={allMovies.indexOf(movie) + 1}
                            />
                        ))}
                        {/* {filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            year={movie.year}
                            rating={movie.rating}
                            genre={movie.genre}
                            poster={movie.poster}
                            position={allMovies.indexOf(movie) + 1}
                        />
                    ))} */}
                    </div>
                </section>
            </Activity>
            <Activity mode={data && test.length > 0 ? "hidden" : "visible"}>
                <h2 className={styles["no-movies"]}>Nothing here yet</h2>
            </Activity>
            <PaginationContainer count={paginationCount} onPageNumber={pageNumberHandler} />
        </section>
    )
}