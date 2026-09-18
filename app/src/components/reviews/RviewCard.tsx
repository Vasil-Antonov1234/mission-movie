import { Link } from "react-router";
import type { Rating, Review } from "../../types/types";
import styles from "./ReviewCard.module.css";

function StarRating({ rating }: Rating) {
    const filled = Math.round((Number(rating)));
    return (
        <span className={styles["star-rating"]}>
            {"★".repeat(filled)}
            {"☆".repeat(10 - filled)}
        </span>
    );
}

export default function ReviewCard(
    review: Review
) {
    return (
        <Link to={`/review/${review.id}`} className={styles["review-card"]}>
            <div className={styles["review-card-header"]}>
                <img src={review.movie.poster} alt={review.movie.title} className={styles["review-card-poster"]} />
                <div>
                    <div className={styles["review-card-title"]}>{review.movie.title}</div>
                    {/* <StarRating rating={review.rating} /> */}
                </div>
            </div>
            <div className={styles["text-wrapper"]}>
                <p className={styles["review-card-excerpt"]}>"{review.review}"</p>
                <span className={styles["ellipsis"]}>...</span>
            </div>
            <div className={styles["review-card-meta"]}>
                <span className={styles["review-card-author"]}>— {review.user.firstName} {review.user.lastName}</span>
                <span className={styles["review-card-date"]}>{review.createdAt}</span>
            </div>
        </Link>
    )
}