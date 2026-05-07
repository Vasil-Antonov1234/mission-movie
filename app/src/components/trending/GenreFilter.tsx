import { useState } from "react";
import styles from "./GenreFilter.module.css";

const GENRES = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance", "Documentary"];

export default function GenreFilter() {
    const [activeGenre, setActiveGenre] = useState("All");

    return (
        <div className={styles["genre-filter"]}>
            <span className={styles["genre-filter-label"]}>Browse by:</span>
            {GENRES.map((genre) => (
                <button
                    key={genre}
                    className={activeGenre === genre ? `${styles["genre-btn"]} ${styles["genre-btn--active"]}` : styles["genre-btn"]}
                    onClick={() => setActiveGenre(genre)}
                >{genre}</button>
            ))}
        </div>
    );
}