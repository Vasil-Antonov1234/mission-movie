import type { Cast } from "../../types/types";
import styles from "./CastCard.module.css";



export default function CastCard(person: Cast) {
    return (
        <div key={person.person.id} className={styles["cast-card"]}>
            <img src={person.person.photo} alt={person.person.name} className={styles["cast-card-img"]} />
            <div className={styles["cast-card-body"]}>
                <div className={styles["cast-card-name"]}>{person.person.name}</div>
                <div className={styles["cast-card-role"]}>{person.person.role}</div>
            </div>
        </div>
    )
}