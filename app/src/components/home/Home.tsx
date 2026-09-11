import React, { Activity, useContext, useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Hero from "../hero/Hero";
import Reviews from "../reviews/Reviews";
import SelectionFilter from "../trending/SelectionFilter";
import Trending from "../trending/Trending";
import styles from "./Home.module.css";
import type { Featured, Movie } from "../../types/types";
import filterRecordsHandler from "../../utils/filterRecordsHandler";
import UserContext from "../../contexts/UserContext";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router";

const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary", "Fantasy", "Adventure"];

const initialStateFeatuted: Featured[] = [];
const initialStateTrending: Movie[] = [];

export default function Home() {
    const [heroState, setHeroState] = useState(1);
    const [moveState, SetMoveState] = useState("next");
    const [activeGenre, setActiveGenre] = useState("All");
    const { isAuthenticated } = useContext(UserContext);
    const { data: trending } = useFetch(`/movies/latest?where=genre%3D%22${activeGenre}%22`, initialStateTrending);
    const { data: featuredMovies } = useFetch("/movies/featured", initialStateFeatuted);

    if (!Array.isArray(trending)) {
        return;
    };

    const filteredTrending = filterRecordsHandler.filterByGenre(trending, activeGenre);

    function nextHeroHandler() {

        if (!featuredMovies || heroState > featuredMovies.length - 1) {
            return;
        };

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
                    <span className={heroState === 1 ? styles["next-slide"] : `${styles["next-slide"]} ${styles["hover-slade"]}`} onClick={previousHeroHandler} onTouchEnd={(event) => touchEndHandler(event)}>{"<"}</span>
                    <span className={featuredMovies && heroState >= featuredMovies.length ? styles["previous-slide"] : `${styles["previous-slide"]} ${styles["hover-slade"]}`} onClick={nextHeroHandler} onTouchEnd={(event) => touchEndHandler(event)}>{">"}</span>
                    <div className={`${styles["hero-container"]} ${styles[`hero-container-state${heroState}-${moveState}`]}`}>
                        {featuredMovies?.map((movie) => <Hero key={movie.id} movie={movie} position={featuredMovies.indexOf(movie)} />)}
                    </div>
                </div>
            </section>
            <SelectionFilter
                options={options}
                setSortBy={setActiveGenre}
                activeState={activeGenre} />
            <Trending trending={filteredTrending} />
            <Activity mode={filteredTrending.length < 1 ? "visible" : "hidden"}>
                <h2 className={styles["no-movies"]}>Nothing here yet</h2>
            </Activity>
            <Activity mode={isAuthenticated ? "hidden" : "visible"}>
                <section className={styles["cta-banner"]}>
                    <div className={`${styles["section-label"]} ${styles["cta-banner-eyebrow"]}`}>Join the community</div>
                    <h2 className={styles["cta-banner-title"]}>Track every film you've ever watched.</h2>
                    <p className={styles["cta-banner-text"]}>
                        Write reviews, build lists, discover new films, and connect with other cinephiles who share
                        your taste.
                    </p>
                    <Link to="/register">
                        <ButtonPrimary text="Create your free account" addStyle="cta-btn--large" />
                    </Link>
                </section>
            </Activity>
            <Reviews />
        </div>
    );
}