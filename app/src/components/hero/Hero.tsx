import styles from "./Hero.module.css";

type Featured = {
    title: string,
    year: number,
    genre: string[],
    rating: number,
    description: string,
    backdrop: string,
    director: string,
    duration: string
}

type Test = {rating: number}

const FEATURED: Featured = {
    title: "Dune: Part Two",
    year: 2024,
    genre: ["Sci-Fi", "Adventure"],
    rating: 8.8,
    description:
        "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.",
    backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    director: "Denis Villeneuve",
    duration: "2h 46m",
};

function RatingBadge({ rating }: Test) {
    return <span className={styles["rating-badge"]}>★ {rating}</span>;
}

export default function Hero() {
    return (
        <div className={styles["hero"]}>
            <img src={FEATURED.backdrop} alt={FEATURED.title} className={styles["hero-backdrop"]} />
            <div className={styles["hero-overlay-h"]} />
            <div className={styles["hero-overlay-v"]} />
            <div className={styles["hero-content"]}>
                <div className={styles["section-label hero-eyebrow"]}>✦ Featured film</div>
                <h1 className={styles["hero-title"]}>{FEATURED.title}</h1>
                <div className={styles["hero-meta"]}>
                    <span>{FEATURED.year}</span>
                    <span className={styles["hero-meta-dot"]}>·</span>
                    <span>{FEATURED.duration}</span>
                    <span className={styles["hero-meta-dot"]}>·</span>
                    <span>{FEATURED.genre.join(", ")}</span>
                    <span className={styles["hero-meta-dot"]}>·</span>
                    <RatingBadge rating={FEATURED.rating} />
                </div>
                <p className={styles["hero-description"]}>{FEATURED.description}</p>
                <div className={styles["hero-actions"]}>
                    <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]}`}>▶ Watch Trailer</button>
                    <button className={`${styles["cta-btn"]} ${styles["cta-btn--secondary"]}`}>Read Review</button>
                </div>
            </div>
        </div>
    );
}