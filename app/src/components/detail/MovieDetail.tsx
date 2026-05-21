import { useState } from "react";
import styles from "./MovieDetails.module.css";

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
    backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1400&q=80",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
    synopsis:
        "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. Tasked by General Leslie Groves to lead the Manhattan Project, Oppenheimer assembles a team of the world's brightest minds at a secret laboratory in Los Alamos, New Mexico. The film chronicles not only the scientific achievement but also the profound moral reckoning that followed — a man who both saved and damned the world in the same breath. Intercut with a 1954 security hearing that threatens to strip him of his reputation, the film is as much a psychological portrait as it is a historical epic.",
    cast: [
        {
            id: 1,
            name: "Cillian Murphy",
            role: "J. Robert Oppenheimer",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        },
        {
            id: 2,
            name: "Emily Blunt",
            role: "Katherine Oppenheimer",
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        },
        {
            id: 3,
            name: "Matt Damon",
            role: "Gen. Leslie Groves",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        },
        {
            id: 4,
            name: "Robert Downey Jr.",
            role: "Lewis Strauss",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
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

type  StarRatingProps = { rating: number}

function StarRating({ rating }: StarRatingProps) {
    const filled = Math.round((rating / 5) * 5);
    return (
        <span className={styles["star-rating"]}>
            {"★".repeat(filled)}{"☆".repeat(5 - filled)}
        </span>
    );
}

type RatingBadgeProps = {rating: number, large?: boolean}

function RatingBadge({ rating, large = false }: RatingBadgeProps) {
    return (
        <span className={`${styles["rating-badge"]}${large ? " rating-badge--large" : ""}`}>
            ★ {rating}
        </span>
    );
}

export default function MovieDetail() {
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const movie = MOVIE;

    return (
        <div className={styles["detail-wrapper"]}>

            {/* ─── HERO ─── */}
            <div className={styles["detail-hero"]}>
                <img src={movie.backdrop} alt={movie.title} className={styles["detail-hero-img"]} />
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
                            {movie.genres.map((g) => (
                                <span key={g} className={styles["detail-genre-tag"]}>{g}</span>
                            ))}
                        </div>

                        <div className={styles["detail-hero-actions"]}>
                            <button className={`${styles["cta-btn"]}${styles["cta-btn--primary"]}`}>▶ Watch Trailer</button>
                            <button className={`${styles["cta-btn"]}${styles["cta-btn--secondary"]}`}>+ Add to Watchlist</button>
                            <button className={`${styles["cta-btn"]}${styles["cta-btn--ghost"]}`}>♥ Favourite</button>
                        </div>
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
                        <div className={styles["scores-grid"]}>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>Reelist Score</div>
                                <div className={`${styles["score-card-value"]}${styles["score-card-value--gold"]}`}>{movie.rating}</div>
                                <div className={styles["score-card-sub"]}>{movie.ratingsCount} ratings</div>
                            </div>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>Metascore</div>
                                <div className={styles["score-card-value"]}>{movie.metascore}</div>
                                <div className={styles["score-card-sub"]}>Metacritic</div>
                            </div>
                            <div className={styles["score-card"]}>
                                <div className={styles["score-card-label"]}>Tomatometer</div>
                                <div className={styles["score-card-value"]}>{movie.rottenTomatoes}%</div>
                                <div className={styles["score-card-sub"]}>Rotten Tomatoes</div>
                            </div>
                        </div>
                    </section>

                    <hr className={styles["section-divider"]} />

                    {/* Cast */}
                    <section className={styles["cast-section"]}>
                        <div className={styles["section-label"]}>People</div>
                        <h2 className={styles["synopsis-heading"]}>Cast</h2>
                        <div className={styles["cast-grid"]}>
                            {movie.cast.map((person) => (
                                <div key={person.id} className={styles["cast-card"]}>
                                    <img src={person.photo} alt={person.name} className={styles["cast-card-img"]} />
                                    <div className={styles["cast-card-body"]}>
                                        <div className={styles["cast-card-name"]}>{person.name}</div>
                                        <div className={styles["cast-card-role"]}>{person.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className={styles["section-divider"]} />

                    {/* Reviews */}
                    <section className={styles["reviews-section"]}>
                        <div className={styles["section-label"]}>Community</div>
                        <h2 className={styles["synopsis-heading"]}>Reviews</h2>

                        {/* Rate this film */}
                        <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ fontSize: "13px", color: "#7a7068" }}>Rate this film:</span>
                            <div style={{ display: "flex", gap: "4px" }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setUserRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        style={{
                                            fontSize: "22px",
                                            cursor: "pointer",
                                            color: star <= (hoverRating || userRating) ? "#e8b84b" : "#2a2a2a",
                                            transition: "color 0.15s",
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {userRating > 0 && (
                                <span style={{ fontSize: "13px", color: "#e8b84b" }}>
                                    {["", "Poor", "Fair", "Good", "Great", "Masterpiece"][userRating]}
                                </span>
                            )}
                        </div>

                        <div className={styles["reviews-list"]}>
                            {movie.reviews.map((review) => (
                                <div key={review.id} className={styles["review-item"]}>
                                    <div className={styles["review-item-header"]}>
                                        <div>
                                            <div className={styles["review-item-author"]}>{review.author}</div>
                                            <div className={styles["review-item-date"]}>{review.date}</div>
                                        </div>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className={styles["review-item-text"]}>"{review.text}"</p>
                                </div>
                            ))}
                        </div>
                    </section>

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
                                <span className={styles["sidebar-info-value"]}>{movie.writers.join(", ")}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Studio</span>
                                <span className={styles["sidebar-info-value"]}>{movie.studio}</span>
                            </div>
                            <div className={styles["sidebar-info-item"]}>
                                <span className={styles["sidebar-info-label"]}>Release Date</span>
                                <span className={styles["sidebar-info-value"]}>{movie.releaseDate}</span>
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
                            {movie.genres.map((g) => (
                                <button key={g} className={styles["sidebar-tag"]}>{g}</button>
                            ))}
                        </div>
                    </div>

                    {/* Similar films */}
                    <div className={styles["sidebar-card"]}>
                        <div className={styles["sidebar-card-title"]}>Similar Films</div>
                        <div className={styles["similar-list"]}>
                            {movie.similar.map((film) => (
                                <div key={film.id} className={styles["similar-item"]}>
                                    <img src={film.poster} alt={film.title} className={styles["similar-item-img"]} />
                                    <div className={styles["similar-item-info"]}>
                                        <div className={styles["similar-item-title"]}>{film.title}</div>
                                        <div className={styles["similar-item-year"]}>{film.year}</div>
                                        <RatingBadge rating={film.rating} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    );
}