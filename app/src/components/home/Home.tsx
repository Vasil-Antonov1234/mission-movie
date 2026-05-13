import Hero from "../hero/Hero";
import Reviews from "../reviews/Reviews";
import GenreFilter from "../trending/GenreFilter";
import Trending from "../trending/Trending";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles["home-wrapper"]}>
            <Hero />
            <GenreFilter />
            <Trending />
            <section className={styles["cta-banner"]}>
                <div className={`${styles["section-label"]} ${styles["cta-banner-eyebrow"]}`}>Join the community</div>
                <h2 className={styles["cta-banner-title"]}>Track every film you've ever watched.</h2>
                <p className={styles["cta-banner-text"]}>
                    Write reviews, build lists, discover new films, and connect with other cinephiles who share
                    your taste.
                </p>
                <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]} ${styles["cta-btn--large"]}`}>
                    Create your free account
                </button>
            </section>
            <Reviews />
        </div>
    );
}