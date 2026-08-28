import styles from "./MovieDetails.module.css";
import CommentsSection from "../comments/CommentsSection";
import CastCard from "./CastCard";
import ButtonChost from "../buttons/ButtonGhost";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ButtonPrimary from "../buttons/ButtonPrimary";
import SiilarFilm from "./SimilarFilm";
import useFetch from "../../hooks/useFetch";
import { useParams, Link, useNavigate } from "react-router";
import { Activity, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { errorMessageHandler } from "../../utils/errorUtil";
import type { Movie } from "../../types/types";

const MOVIE = {
    id: 1,
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    year: 2023,
    duration: "3h 0m",
    rating: 8.9,
    ratingsCount: "642K",
    metascore: 88,
    rottenTomatoes: 93,
    director: "Christopher Nolan",
    writers: ["Christopher Nolan"],
    studio: "Universal Pictures",
    budget: "$100M",
    boxOffice: "$952M",
    language: "English",
    country: "United States",
    releaseDate: "July 21, 2023",
    genres: ["Drama", "History", "Thriller"],
    backdrop: "https://m.media-amazon.com/images/I/91L+jiIFA3L.jpg",
    poster: "https://m.media-amazon.com/images/I/91L+jiIFA3L.jpg",
    synopsis:
        "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. Tasked by General Leslie Groves to lead the Manhattan Project, Oppenheimer assembles a team of the world's brightest minds at a secret laboratory in Los Alamos, New Mexico. The film chronicles not only the scientific achievement but also the profound moral reckoning that followed — a man who both saved and damned the world in the same breath. Intercut with a 1954 security hearing that threatens to strip him of his reputation, the film is as much a psychological portrait as it is a historical epic.",
    cast: [
        {
            id: 1,
            name: "Cillian Murphy",
            role: "J. Robert Oppenheimer",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-nMx32JMWKq1YWId_yvkG-DTpRcrMZw5brTeIwI6ag1Z4sC8TvBBOC9Zw-ie6pMarbxG1luhB0stDor6tdt7SghnZUTKpLjSuri9qF2g&s=10",
        },
        {
            id: 2,
            name: "Emily Blunt",
            role: "Katherine Oppenheimer",
            photo: "https://s.yimg.com/os/en/mandatory_995/770b9ee1b5583034feb5e8748fc641a4",
        },
        {
            id: 3,
            name: "Matt Damon",
            role: "Gen. Leslie Groves",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4aq1mki4ROCo_-GZPHdOTyHyT2HkgYXRONZxxd-UjOpstfMQzEi4PxGa5T2w7euPyt3qZHa3upuZ0v2dhVhsAk-mZddpcayg8FcuHBQ&s=10",
        },
        {
            id: 4,
            name: "Robert Downey Jr.",
            role: "Lewis Strauss",
            photo: "https://variety.com/wp-content/uploads/2024/01/GettyImages-1431200396-e1704401442760.jpg?w=681&h=383&crop=1",
        },
    ],
    reviews: [
        {
            id: 1,
            author: "Elena Marsh",
            date: "Aug 3, 2023",
            rating: 5,
            text: "Nolan has never been more controlled or more explosive. Oppenheimer is a film that refuses to let you look away — from the science, from the politics, from the man himself. Cillian Murphy gives the performance of his generation.",
        },
        {
            id: 2,
            author: "James Okafor",
            date: "Aug 10, 2023",
            rating: 4,
            text: "A towering achievement of form and substance. The Trinity sequence alone is worth the price of admission — Nolan renders the unknowable tangible. If it stumbles anywhere, it's in the courtroom sequences, which pale against the volcanic first two acts.",
        },
        {
            id: 3,
            author: "Sofia Navarro",
            date: "Sep 1, 2023",
            rating: 5,
            text: "Three hours that feel like thirty minutes. Dense, demanding, devastating. The kind of film that demands you sit with it for days after — and then watch it again.",
        },
    ],
    similar: [
        {
            id: 2,
            title: "Dunkirk",
            year: 2017,
            rating: 7.8,
            poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&q=80",
        },
        {
            id: 3,
            title: "The Imitation Game",
            year: 2014,
            rating: 8.0,
            poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&q=80",
        },
        {
            id: 4,
            title: "Darkest Hour",
            year: 2017,
            rating: 7.4,
            poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200&q=80",
        },
    ],
};

type RatingBadgeProps = { rating: number, large?: boolean }

function RatingBadge({ rating, large = false }: RatingBadgeProps) {
    return (
        <span className={`${styles["rating-badge"]} ${large ? " rating-badge--large" : ""}`}>
            ★ {rating}
        </span>
    );
}

export default function MovieDetail() {
    const { isAuthenticated, user } = useContext(UserContext);
    const navigate = useNavigate();
    const oldMovie = MOVIE;

    const movieId = useParams().movieId;

    const initialState: Movie = {
        id: 0,
        genre: "",
        poster: "",
        rating: 0,
        title: ""
    }

    const { data: movie } = useFetch(`/movies/${movieId}`, initialState);

    const genreArray = !movie || Array.isArray(movie) ? " " : movie?.genre.split(", ");

    const movies: Movie[] = []

    const { data: similarMoviesData, request } = useFetch(`/movies/similar?where=genre%3D%22${genreArray[0]}%22&where=genre1%3D%22${genreArray[1]}%22&where=movieId%3D%22${movieId}%22`, movies);

    if (!movie) {
        return;
    };

    const isOwner = movie.authorId === user.id;

    const similarMovies = similarMoviesData ? similarMoviesData : [];

    async function deleteHandler() {

        if (!movie) {
            return;
        };

        const confirmation = confirm(`Are you sure you want to delete ${movie.title}`);

        if (!confirmation) {
            return;
        };

        try {
            await request(`/movies/${movieId}`, "DELETE", { accessToken: user.accessToken });

            navigate("/movies/catalog");
        } catch (error) {
            errorMessageHandler(error);
        };
    }

    return (
        <div className={styles["detail-wrapper"]}>

            {/* ─── HERO ─── */}
            <div className={styles["detail-hero"]}>
                <img src={movie.poster} alt={movie.title} className={styles["detail-hero-img"]} />
                <div className={styles["detail-hero-overlay-h"]} />
                <div className={styles["detail-hero-overlay-v"]} />

                <div className={styles["detail-hero-content"]}>
                    {/* Poster */}
                    <div className={styles["detail-poster-wrapper"]}>
                        <img src={movie.poster} alt={movie.title} className={styles["detail-poster"]} />
                    </div>

                    {/* Info */}
                    <div className={styles["detail-hero-info"]}>
                        <div className={styles["detail-tagline"]}>"{movie.tagline}"</div>
                        <h1 className={styles["detail-title"]}>{movie.title}</h1>

                        <div className={styles["detail-meta-row"]}>
                            <span className={styles["detail-meta-item"]}>{movie.year}</span>
                            <span className={styles["detail-meta-dot"]}>·</span>
                            <span className={styles["detail-meta-item"]}>{movie.duration}</span>
                            <span className={styles["detail-meta-dot"]}>·</span>
                            <span className={styles["detail-meta-item"]}>{movie.director}</span>
                            <span className={styles["detail-meta-dot"]}>·</span>
                            <RatingBadge rating={movie.rating} />
                        </div>

                        <div className={styles["detail-genre-tags"]}>
                            {movie.genre.split(", ").map((g) => (
                                <span key={g} className={styles["detail-genre-tag"]}>{g}</span>
                            ))}
                        </div>

                        <div className={styles["detail-hero-actions"]}>
                            <Activity mode={movie.trailerUrl ? "visible" : "hidden"}>
                                <Link to={movie.trailerUrl ? movie.trailerUrl : ""} target="_blank">
                                    <ButtonPrimary text="▶ Watch Trailer" addStyle="btn-170" />
                                </Link>
                            </Activity>
                            <ButtonSecondary text="+ Add to Watchlist" addStyle="btn-170" />
                            <ButtonChost text="♥ Favourite" addStyle="btn-170" />
                        </div>
                        <Activity mode={isAuthenticated && isOwner ? "visible" : "hidden"}>
                            <div className={`${styles["detail-hero-actions"]} ${styles["detail-hero-edit-delete"]}`}>
                                <Link to={`/movies/${movie.id}/edit`}>
                                    <ButtonSecondary text="Edit" addStyle="btn-gray" />
                                </Link>
                                <ButtonSecondary clickHandler={deleteHandler} text="Delete" addStyle="btn-red" />
                                <Link to={`/movies/${movie.id}/attach`}>
                                    <ButtonSecondary text="Add cast" addStyle="btn-170" />
                                </Link>
                            </div>
                        </Activity>
                    </div>
                </div>
            </div>
            {/* ─── BODY ─── */}
            <div className={styles["detail-body"]}>

                {/* LEFT COLUMN */}
                <main className={styles["detail-main"]}>

                    {/* Synopsis */}
                    <section className={styles["synopsis-section"]}>
                        <div className={styles["section-label"]}>Overview</div>
                        <h2 className={styles["synopsis-heading"]}>Synopsis</h2>
                        <p className={styles["synopsis-text"]}>{movie.synopsis}</p>
                    </section>

                    <hr className={styles["section-divider"]} />

                    {/* Scores */}
                    <section className={styles["scores-section"]}>
                        <div className={styles["section-label"]}>Ratings</div>
                        <div className={styles["scores-container"]}>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>Reelist Score</div>
                                <div className={`${styles["score-card-value"]} ${styles["score-card-value--gold"]}`}>{movie.rating}</div>
                                <div className={styles["score-card-sub"]}>{oldMovie.ratingsCount} ratings</div>
                            </div>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>From</div>
                                <div className={styles["score-card-value"]}>{oldMovie.metascore}</div>
                                <div className={styles["score-card-sub"]}>Users</div>
                            </div>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>Reviews</div>
                                <div className={styles["score-card-value"]}>{oldMovie.rottenTomatoes}</div>
                                <div className={styles["score-card-sub"]}>Counter</div>
                            </div>
                        </div>
                    </section>

                    <hr className={styles["section-divider"]} />

                    {/* Cast */}
                    <section className={styles["cast-section"]}>
                        <div className={styles["section-label"]}>People</div>
                        <h2 className={styles["synopsis-heading"]}>Cast</h2>
                        <div className={styles["cast-grid"]}>
                            {movie.casts?.map((person) => (
                                <CastCard key={person.castId} person={person} />
                            ))}
                        </div>
                    </section>
                    <Activity mode={movie.casts && movie.casts.length > 0 ? "hidden" : "visible"}>
                        <h2 className={styles["no-cats"]}>Nothing here yet.
                            <p>
                                <Link to={`/movies/${movieId}/attach`} className={styles["section-link"]}>Click to attach the first.</Link>
                            </p>
                        </h2>
                    </Activity>

                    <hr className={styles["section-divider"]} />

                    <CommentsSection comments={oldMovie.reviews} />

                </main>

                {/* RIGHT SIDEBAR */}
                <aside className={styles["detail-sidebar"]}>

                    {/* Film details */}
                    <div className={styles["sidebar-card"]}>
                        <div className={styles["sidebar-card-title"]}>Film details</div>
                        <div className={styles["sidebar-info-list"]}>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Director</span>
                                <span className={styles["sidebar-info-value"]}>{movie.director}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Written by</span>
                                <span className={styles["sidebar-info-value"]}>{movie.writtenBy}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Studio</span>
                                <span className={styles["sidebar-info-value"]}>{movie.studio}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Release Date</span>
                                <span className={styles["sidebar-info-value"]}>{`${movie.releaseDate}, ${movie.year}`}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Runtime</span>
                                <span className={styles["sidebar-info-value"]}>{movie.duration}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Language</span>
                                <span className={styles["sidebar-info-value"]}>{movie.language}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Country</span>
                                <span className={styles["sidebar-info-value"]}>{movie.country}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Budget</span>
                                <span className={styles["sidebar-info-value"]}>{movie.budget}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Box Office</span>
                                <span className={styles["sidebar-info-value"]}>{movie.boxOffice}</span>
                            </div>
                        </div>
                    </div>

                    {/* Genres */}
                    <div className={styles["sidebar-card"]}>
                        <div className={styles["sidebar-card-title"]}>Genres</div>
                        <div className={styles["sidebar-tags"]}>
                            {movie.genre.split(", ").map((g) => (
                                <button key={g} className={styles["sidebar-tag"]}>{g}</button>
                            ))}
                        </div>
                    </div>

                    {/* Similar films */}
                    <div className={styles["sidebar-card"]}>
                        <div className={styles["sidebar-card-title"]}>Similar Films</div>
                        <div className={styles["similar-list"]}>
                            {similarMovies.map((film) => (
                                <SiilarFilm key={film.id} film={film} />
                            ))}
                        </div>
                        <Activity mode={similarMovies.length > 0 ? "hidden" : "visible"}>
                            <span className={styles["detail-meta-item"]}>Not found any</span>
                        </Activity>
                    </div>

                </aside>
            </div>
        </div>
    );
}