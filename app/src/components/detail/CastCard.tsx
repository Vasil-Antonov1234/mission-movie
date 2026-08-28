import { Link } from "react-router";
import type { Artist } from "../../types/types";
import styles from "./CastCard.module.css";
import { Activity } from "react";

type castProps = {
    person: Artist,
    owner: boolean,
    onRemoveCast: (castId: string, fullName: string) => Promise<void>
}

export default function CastCard(person: castProps) {
    const castId = person.person.castId;
    const fullName = `${person.person.cast.firstName} ${person.person.cast.lastName}`;

    return (
        <div>
            <Link to={`/casts/${person.person.castId}/details`} className={styles["link"]}>
                <div key={person.person.castId} className={styles["cast-card"]}>
                    <img src={person.person.cast.imageUrl} alt={`${person.person.cast.firstName} ${person.person.cast.lastName}`} className={styles["cast-card-img"]} />
                    <div className={styles["cast-card-body"]}>
                        <div className={styles["cast-card-name"]}>{`${person.person.cast.firstName} ${person.person.cast.lastName}`}</div>
                        <div className={styles["cast-card-role"]}>{person.person.nameInMovie}</div>
                    </div>
                </div>
            </Link>
            <Activity mode={person.owner ? "visible" : "hidden"}>
                <p className={styles["remove-from-cast"]} onClick={() => person.onRemoveCast(castId, fullName)}>Remove from the cast</p>
            </Activity>
        </div>

    )
}