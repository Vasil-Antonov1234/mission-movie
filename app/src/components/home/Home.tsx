import React, { useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Hero from "../hero/Hero";
import Reviews from "../reviews/Reviews";
import SelectionFilter from "../trending/SelectionFilter";
import Trending from "../trending/Trending";
import styles from "./Home.module.css";
import type { Featured, Movie } from "../../types/types";
import filterRecordsHandler from "../../utils/filterRecordsHandler";

const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary", "Fantasy", "Adventure"];

const featuredMovies: Featured[] = [
    {
        id: 30,
        title: "Dune: Part Two",
        year: 2024,
        genre: ["Sci-Fi", "Adventure"],
        rating: 8.8,
        description:
            "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.",
        backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
        director: "Denis Villeneuve",
        duration: "2h 46m"
    },
    {
        id: 31,
        title: "The End of Oak Street",
        year: 2026,
        genre: ["Action", "Sci-Fi", "Adventure", "Mistery"],
        rating: 9.1,
        description:
            "The Platt family bands together to navigate their new surroundings after a cosmic event transports their suburban neighborhood to someplace unknown.",
        backdrop: "https://m.media-amazon.com/images/M/MV5BYjU5MTBkOTMtMzg2MC00N2Y0LTk1MmUtMjhmNmZhZjgxZGZlXkEyXkFqcGc@._V1_.jpg",
        director: "David Robert Mitchell",
        duration: "1h 50m"
    },
    {
        id: 32,
        title: "House of the Dragon: Season 3",
        year: 2026,
        genre: ["Action", "Adventure", "Fantasy"],
        rating: 8.3,
        description:
            "An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.",
        backdrop: "https://pbs.twimg.com/media/GbAeMfFXIAAiMlK.jpg",
        director: "Ryan J. Condal",
        duration: "1h"
    }
]

const trending: Movie[] = [
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
    }
];

export default function Home() {
    const [heroState, setHeroState] = useState(1);
    const [moveState, SetMoveState] = useState("next");
    const [activeGenre, setActiveGenre] = useState("All");

    const filteredTrending = filterRecordsHandler.filterByGenre(trending, activeGenre);

    function nextHeroHandler() {

        if (heroState > 2) {
            return
        }

        setHeroState((state) => state + 1);
        SetMoveState("next");
    };

    function previousHeroHandler() {

        if (heroState < 2) {
            return
        }

        setHeroState((state) => state - 1);
        SetMoveState("previous");
    };

    function touchEndHandler(event: React.TouchEvent<HTMLSpanElement>) {
        event.preventDefault();
    }

    return (
        <div className={styles["home-wrapper"]}>
            <section className={styles["hero-wrapper"]}>
                <div className={styles["slide"]}>
                    <span className={heroState === 3 ? styles["next-slide"] : `${styles["next-slide"]} ${styles["hover-slade"]}`} onClick={nextHeroHandler} onTouchEnd={(event) => touchEndHandler(event)}>{"<"}</span>
                    <span className={heroState === 1 ? styles["previous-slide"] : `${styles["previous-slide"]} ${styles["hover-slade"]}`} onClick={previousHeroHandler} onTouchEnd={(event) => touchEndHandler(event)}>{">"}</span>
                    <div className={`${styles["hero-container"]} ${styles[`hero-container-state${heroState}-${moveState}`]}`}>
                        {featuredMovies.map((movie) => <Hero key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </section>
            <SelectionFilter
                options={options}
                setSortBy={setActiveGenre}
                activeState={activeGenre} />
            <Trending trending={filteredTrending} />
            <section className={styles["cta-banner"]}>
                <div className={`${styles["section-label"]} ${styles["cta-banner-eyebrow"]}`}>Join the community</div>
                <h2 className={styles["cta-banner-title"]}>Track every film you've ever watched.</h2>
                <p className={styles["cta-banner-text"]}>
                    Write reviews, build lists, discover new films, and connect with other cinephiles who share
                    your taste.
                </p>
                <ButtonPrimary text="Create your free account" addStyle="cta-btn--large" />
            </section>
            <Reviews />
        </div>
    );
}