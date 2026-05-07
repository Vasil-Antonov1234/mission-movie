import Header from "../header/Header";
import Hero from "../hero/Hero";
import GenreFilter from "../trending/GenreFilter";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles["home-wrapper"]}>
            <Header />
            <Hero />
            <GenreFilter />
            <section className={styles["cta-banner"]}>
                <div className={styles["section-label cta-banner-eyebrow"]}>Join the community</div>
                <h2 className={styles["cta-banner-title"]}>Track every film you've ever watched.</h2>
                <p className={styles["cta-banner-text"]}>
                    Write reviews, build lists, discover new films, and connect with other cinephiles who share
                    your taste.
                </p>
                <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]} ${styles["cta-btn--large"]}`}>
                    Create your free account
                </button>
            </section>
        </div>
    );
}