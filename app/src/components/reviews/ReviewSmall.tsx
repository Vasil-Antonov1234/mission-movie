import { Link } from "react-router";
import styles from "./ReviewCard.module.css"

export default function ReviewSmall() {
    return (
        <Link to={`/review/${0}`} className={`${styles["review-card"]} ${styles["review-card-small"]}`}>
            <div className={styles["text-wrapper"]}>
                <p className={`${styles["review-card-excerpt"]} ${styles["review-card-excerpt-small"]}`}>"{"Christopher Nolan has never been more controlled or more explosive. Oppenheimer is a film that refuses to let you look away — from the science, from the politics, from the man at the centre of it all. Cillian Murphy gives the performance of his generation, inhabiting Oppenheimer's brilliance and his guilt with equal, devastating precision. The Trinity sequence alone is worth the price of admission. Nolan renders the unknowable tangible in a way only cinema can — the absence of sound before the shockwave arrives is one of the most terrifying moments I have experienced in a theatre. It is not a film about the bomb. It is a film about a man who understood exactly what he had done. If it stumbles anywhere, it is in the courtroom sequences, which pale somewhat against the volcanic energy of the first two acts. But this is a minor complaint. Three hours that feel like thirty minutes. Dense, demanding, and utterly devastating."}"</p>
                <span className={styles["ellipsis"]}>...</span>
            </div>
            <div className={styles["review-card-meta"]}>
                <span className={styles["review-card-author"]}>— {"Peter"} {"Pan"}</span>
                <span className={styles["review-card-date"]}>{"04-08 2024"}</span>
            </div>
        </Link>
    );
}