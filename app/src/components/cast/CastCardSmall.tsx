import { Link } from "react-router";
import styles from "./CastCardSmall.module.css"
import type { CastSmall } from "../../types/types";

export default function CastCardSmall(props: CastSmall) {
    return (
        <Link to={`/casts/${props.id}/details`} className={styles["movie-card"]}>
            <div className={styles["movie-card-img-wrapper"]}>
                <img src={`${props.imageUrl}`} alt={`${props.firstName} ${props.lastName}`} className={styles["movie-card-img"]} />
            </div>
            <div className={styles["movie-card-body"]}>
                <div className={styles["movie-card-title"]}>{`${props.firstName} ${props.lastName}`}</div>
            </div>
        </Link>
    );
}