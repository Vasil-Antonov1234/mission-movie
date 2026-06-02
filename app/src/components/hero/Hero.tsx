import type { Featured, Rating } from "../../types/types";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";
import styles from "./Hero.module.css";

function RatingBadge({ rating }: Rating) {
    return <span className={styles["rating-badge"]}>★ {rating}</span>;
}

type HeroProps = {movie: Featured}

export default function Hero(movie: HeroProps) {
    return (
        <div className={styles["hero"]}>
            <img src={movie.movie.backdrop} alt={movie.movie.title} className={styles["hero-backdrop"]} />
            <div className={styles["hero-overlay-h"]} />
            <div className={styles["hero-overlay-v"]} />
            <div className={styles["hero-content"]}>
                <div className={styles["section-label"]}>✦ Featured film</div>
                <h1 className={styles["hero-title"]}>{movie.movie.title}</h1>
                <div className={styles["hero-meta"]}>
                    <span>{movie.movie.year}</span>
                    <span className={styles["hero-meta-dot"]}>·</span>
                    <span>{movie.movie.duration}</span>
                    <span className={styles["hero-meta-dot"]}>·</span>
                    <span>{movie.movie.genre.join(", ")}</span>
                    <span className={styles["hero-meta-dot"]}>·</span>
                    <RatingBadge rating={movie.movie.rating} />
                </div>
                <p className={styles["hero-description"]}>{movie.movie.description}</p>
                <div className={styles["hero-actions"]}>
                    <ButtonPrimary text="▶ Watch Trailer"/>
                    <ButtonSecondary text="Read Review"/>
                </div>
            </div>
        </div>
    );
}