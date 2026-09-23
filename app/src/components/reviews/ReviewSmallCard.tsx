import { Link } from "react-router";
import styles from "./ReviewCard.module.css"
import type { ReviewSmall } from "../../types/types";
import { convertDate } from "../../utils/convertDate";

export default function ReviewSmallCard( review: ReviewSmall ) {
    return (
        <Link to={`/review/${review.id}`} className={`${styles["review-card"]} ${styles["review-card-small"]}`}>
            <div className={styles["text-wrapper"]}>
                <p className={`${styles["review-card-excerpt"]} ${styles["review-card-excerpt-small"]}`}>"{review.review}"</p>
                <span className={styles["ellipsis"]}>...</span>
            </div>
            <div className={styles["review-card-meta"]}>
                <span className={styles["review-card-author"]}>— {review.user.firstName} {review.user.lastName}</span>
                <span className={styles["review-card-date"]}>{convertDate(review.createdAt)}</span>
            </div>
        </Link>
    );
}