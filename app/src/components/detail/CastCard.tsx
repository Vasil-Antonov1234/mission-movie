import { Link } from "react-router";
import type { Artist } from "../../types/types";
import styles from "./CastCard.module.css";

type castProps = {
    person: Artist
}

export default function CastCard(person: castProps) {
    return (
        <Link to={`/casts/${person.person.castId}/details`} className={styles["link"]}>
            <div key={person.person.castId} className={styles["cast-card"]}>
                <img src={person.person.cast.imageUrl} alt={`${person.person.cast.firstName} ${person.person.cast.lastName}`} className={styles["cast-card-img"]} />
                <div className={styles["cast-card-body"]}>
                    <div className={styles["cast-card-name"]}>{`${person.person.cast.firstName} ${person.person.cast.lastName}`}</div>
                    <div className={styles["cast-card-role"]}>{person.person.nameInMovie}</div>
                </div>
            </div>
        </Link>
    )
}