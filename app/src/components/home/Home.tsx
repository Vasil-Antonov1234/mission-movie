import ButtonPrimary from "../buttons/ButtonPrimary";
import Hero from "../hero/Hero";
import Reviews from "../reviews/Reviews";
import SelectionFilter from "../trending/SelectionFilter";
import Trending from "../trending/Trending";
import styles from "./Home.module.css";

const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary"];

export default function Home() {
    return (
        <div className={styles["home-wrapper"]}>
            <Hero />
            <SelectionFilter options={options} />
            <Trending />
            <section className={styles["cta-banner"]}>
                <div className={`${styles["section-label"]} ${styles["cta-banner-eyebrow"]}`}>Join the community</div>
                <h2 className={styles["cta-banner-title"]}>Track every film you've ever watched.</h2>
                <p className={styles["cta-banner-text"]}>
                    Write reviews, build lists, discover new films, and connect with other cinephiles who share
                    your taste.
                </p>
                <ButtonPrimary text="Create your free account" width="cta-btn--large"/>
            </section>
            <Reviews />
        </div>
    );
}