import styles from "./MovieDetails.module.css";
import CommentsSection from "../comments/CommentsSection";
import CastCard from "./CastCard";
import ButtonChost from "../buttons/ButtonGhost";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ButtonPrimary from "../buttons/ButtonPrimary";
import SiilarFilm from "./SimilarFilm";
import useFetch from "../../hooks/useFetch";
import { useParams, Link, useNavigate } from "react-router";
import { Activity, useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { errorMessageHandler } from "../../utils/errorUtil";
import type { Movie, Options } from "../../types/types";
import { toast } from "react-toastify";

type RatingBadgeProps = { rating?: string, large?: boolean }

function RatingBadge({ rating, large = false }: RatingBadgeProps) {
    return (
        <span className={`${styles["rating-badge"]} ${large ? " rating-badge--large" : ""}`}>
            ★ {rating}
        </span>
    );
}

export default function MovieDetail() {
    const { isAuthenticated, user, onLogout } = useContext(UserContext);
    const navigate = useNavigate();

    const movieId = useParams().movieId;

    const initialState: Movie = {
        id: 0,
        genre: "",
        poster: "",
        rating: "0",
        title: ""
    }

    const { data: movie, setData } = useFetch(`/movies/${movieId}`, initialState);
    const genreArray = !movie ? " " : movie?.genre.split(", ");

    const movies: Movie[] = []

    const { data: similarMoviesData, request } = useFetch(`/movies/similar?where=genre%3D%22${genreArray[0]}%22&where=genre1%3D%22${genreArray[1]}%22&where=movieId%3D%22${movieId}%22`, movies);
    const [hasRated, setHasRated] = useState<boolean>(false);
    const { data: ratesCount } = useFetch(`/rates/count/${movieId}`, "1");


    useEffect(() => {

        try {

            (async () => {
                
            })()

            if (!user.accessToken) {
                return;
            };

            const controller = new AbortController();

            (async () => {

                const options: Options = {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        authorization: user.accessToken
                    },
                    signal: controller.signal
                }

                const response = await fetch(`http://localhost:5000/rates/${movieId}`, options);

                const result: boolean = await response.json();

                setHasRated(result);

                return () => {
                    controller.abort();
                }
            })()
        } catch (error) {
            errorMessageHandler(error);
        }

    }, [movieId, user.accessToken])

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
    };

    async function removeFromCastHandler(castId: string, fullName: string) {

        if (!isOwner) {
            onLogout("/login");
        };

        const confirmation = confirm(`Are you sure you want to remove ${fullName} from the cast?`);

        if (!confirmation) {
            return;
        };

        try {
            await request(`/movies/${movieId}/${castId}/unattach`, "GET", { accessToken: user.accessToken });

            const castData = movie?.casts?.filter((x) => x.castId !== castId);

            const movieData = movie

            if (movieData) {
                movieData.casts = castData;
            };

            setData((state) => state ? ({ ...state, casts: castData }) : initialState)
            toast(`${fullName} has beed removed from the cast`);

        } catch (error) {
            errorMessageHandler(error);
        };
    };

    async function rateHandler(userRating: number) {
        try {
            const newMovieData: Movie = await request(`/rates/${movieId}`, "POST", { accessToken: user.accessToken }, { userRating });

            setData(newMovieData);
            setHasRated(true);
            toast(`You have rated ${movie?.title} with ${userRating} stars`);
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
                                <div className={styles["score-card-label"]}>MM Score</div>
                                <div className={`${styles["score-card-value"]} ${styles["score-card-value--gold"]}`}>{movie.rating}</div>
                                <div className={styles["score-card-sub"]}>stars</div>
                            </div>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>From</div>
                                <div className={styles["score-card-value"]}>{ratesCount}</div>
                                <div className={styles["score-card-sub"]}>Users</div>
                            </div>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>Reviews</div>
                                <div className={styles["score-card-value"]}>{movie.reviwesCont}</div>
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
                                <CastCard key={person.castId} person={person} owner={isOwner} onRemoveCast={removeFromCastHandler} />
                            ))}
                        </div>
                    </section>
                    <Activity mode={movie.casts && movie.casts.length > 0 ? "hidden" : "visible"}>
                        <h2 className={styles["no-cats"]}>Nothing here yet.
                            <Activity mode={isOwner ? "visible" : "hidden"}>
                                <p>
                                    <Link to={`/movies/${movieId}/attach`} className={styles["section-link"]}>Click to attach the first.</Link>
                                </p>
                            </Activity>
                        </h2>
                    </Activity>

                    <hr className={styles["section-divider"]} />

                    {/* COMMENTS AND RATE SECTION */}
                    <CommentsSection owner={isOwner} onRate={rateHandler} hasRated={hasRated} />

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