import { useState } from "react";
import styles from "./SelectionFilter.module.css";
import type { SelectionOptions } from "../../types/types";

export default function SelectionFilter(
    props: SelectionOptions
) {
    const [showGenreFilter, setShowGenreFilter] = useState(false);

    function showGenreFilterHandler() {
        setShowGenreFilter((state) => !state);
    };

    function setGenreHandler(genre: string) {

        props.setSortBy(genre);
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
                        props.activeState === genre ? `${styles["genre-btn"]} ${styles["genre-btn--active"]}` : `${styles["genre-btn"]} ${styles["genre-btn--non-active"]}` :
                        props.activeState === genre ? 
                                                `${styles["genre-btn"]} ${styles["genre-btn--active"]} ${styles["genre-btn"]} ${styles["genre-btn--non-active"]} ${styles["genre-btn-hide"]}` : 
                                                `${styles["genre-btn"]} ${styles["genre-btn--non-active"]} ${styles["genre-btn"]} ${styles["genre-btn--non-active"]} ${styles["genre-btn-hide"]}`
                    }
                    onClick={() => setGenreHandler(genre)}
                >{genre}</button>
            ))}
        </div>
    );
}