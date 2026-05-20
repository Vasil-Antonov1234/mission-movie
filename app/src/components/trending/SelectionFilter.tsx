import { useState } from "react";
import styles from "./GenreFilter.module.css";
import type { SelectionOptions } from "../../types/component.types";

export default function SelectionFilter(
    props: SelectionOptions
) {
    const [activeGenre, setActiveGenre] = useState("All");
    const [showGenreFilter, setShowGenreFilter] = useState(false);

    function showGenreFilterHandler() {
        setShowGenreFilter((state) => !state);
    };

    return (
        <div className={styles["genre-filter"]}>
            <span className={styles["genre-filter-label"]} onClick={showGenreFilterHandler}>Browse by:</span>
            <div>
                <span className={showGenreFilter ? `${styles["genre-arrow"]} ${styles["rotate-left"]}` : `${styles["genre-arrow"]} ${styles["rotate-right"]}`}>▶</span>
                <span className={showGenreFilter ? `${styles["genre-arrow"]} ${styles["rotate-left"]}` : `${styles["genre-arrow"]} ${styles["rotate-right"]}`}>▶</span>
                <span className={showGenreFilter ? `${styles["genre-arrow"]} ${styles["rotate-left"]}` : `${styles["genre-arrow"]} ${styles["rotate-right"]}`}>▶</span>
            </div>
            {props.options.map((genre) => (
                <button
                    key={genre}
                    className=
                    {showGenreFilter ?
                        activeGenre === genre ? `${styles["genre-btn"]} ${styles["genre-btn--active"]}` : `${styles["genre-btn"]} ${styles["genre-btn--non-active"]}` :
                        activeGenre === genre ? 
                                                `${styles["genre-btn"]} ${styles["genre-btn--active"]} ${styles["genre-btn"]} ${styles["genre-btn--non-active"]} ${styles["genre-btn-hide"]}` : 
                                                `${styles["genre-btn"]} ${styles["genre-btn--non-active"]} ${styles["genre-btn"]} ${styles["genre-btn--non-active"]} ${styles["genre-btn-hide"]}`
                    }
                    onClick={() => setActiveGenre(genre)}
                >{genre}</button>
            ))}
        </div>
    );
}