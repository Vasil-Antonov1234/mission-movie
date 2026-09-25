import { Link } from "react-router";
import styles from "./CastCardSmall.module.css"

export default function CastCardSmall() {
    return (
        <Link to={`/casts/castId/details`} className={styles["movie-card"]}>
            <div className={styles["movie-card-img-wrapper"]}>
                <img src="poster" alt="full name" className={styles["movie-card-img"]} />
            </div>
            <div className={styles["movie-card-body"]}>
                {/* <div className={styles["movie-card-genre"]}>{movie.genre}</div> */}
                <div className={styles["movie-card-title"]}>Full Name</div>
            </div>
        </Link>
    );
}