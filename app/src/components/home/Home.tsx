import { useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Hero from "../hero/Hero";
import Reviews from "../reviews/Reviews";
import SelectionFilter from "../trending/SelectionFilter";
import Trending from "../trending/Trending";
import styles from "./Home.module.css";

const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary"];


export default function Home() {
    const [heroState, setHeroState] = useState(1);
    const [moveState, SetMoveState] = useState("next");
    
    function nextHeroHandler() {
        setHeroState((state) => state + 1);
        SetMoveState("next");
    };

    function previousHeroHandler() {
        setHeroState((state) => state - 1);
        SetMoveState("previous");
    };

    return (
        <div className={styles["home-wrapper"]}>
            <section className={styles["hero-wrapper"]}>
                <span className={heroState < 3 ? styles["next-slide"] : styles["hide-nexts-previous-button"]} onClick={nextHeroHandler}>{"<"}</span>
                <span className={heroState > 1 ? styles["previous-slide"] : styles["hide-nexts-previous-button"]} onClick={previousHeroHandler}>{">"}</span>
                <div className={`${styles["hero-container"]} ${styles[`hero-container-state${heroState}-${moveState}`]}`}>
                    <Hero />
                    <Hero />
                    <Hero />
                </div>
            </section>
            <SelectionFilter options={options} />
            <Trending />
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