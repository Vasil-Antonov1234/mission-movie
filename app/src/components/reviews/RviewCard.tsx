import type { Rating, Review } from "../../types/component.types";
import styles from "./ReviewCard.module.css";

function StarRating({ rating }: Rating) {
    const filled = Math.round((rating / 5) * 5);
    return (
        <span className={styles["star-rating"]}>
            {"★".repeat(filled)}
            {"☆".repeat(5 - filled)}
        </span>
    );
}

export default function ReviewCard(
    review: Review
) {
    return (
        <div key={review.id} className={styles["review-card"]}>
            <div className={styles["review-card-header"]}>
                <img src={review.poster} alt={review.title} className={styles["review-card-poster"]} />
                <div>
                    <div className={styles["review-card-title"]}>{review.title}</div>
                    <StarRating rating={review.rating} />
                </div>
            </div>
            <p className={styles["review-card-excerpt"]}>"{review.excerpt}"</p>
            <div className={styles["review-card-meta"]}>
                <span className={styles["review-card-author"]}>— {review.author}</span>
                <span className={styles["review-card-date"]}>{review.date}</span>
            </div>
        </div>
    )
}