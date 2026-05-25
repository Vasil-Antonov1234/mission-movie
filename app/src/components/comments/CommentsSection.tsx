import { useState } from "react";
import styles from "./CommentsSection.module.css";
import type { Comment } from "../../types/component.types";

type StarRatingProps = { rating: number }

function StarRating({ rating }: StarRatingProps) {
    const filled = Math.round((rating / 5) * 5);
    return (
        <span className={styles["star-rating"]}>
            {"★".repeat(filled)}{"☆".repeat(5 - filled)}
        </span>
    );
}

type CommentsSectionProps = { comments: Comment[] }

export default function CommentsSection( { comments }: CommentsSectionProps ) {
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <section className={styles["comments-section"]}>
            <div className={styles["section-label"]}>Community</div>
            <h2 className={styles["synopsis-heading"]}>Comments</h2>

            {/* Rate this film */}
            <div className={styles["rate-film-container"]}>
                <span className={styles["rate-film-label"]}>Rate this film:</span>
                <div className={styles["stars-container"]}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setUserRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className={star <= (hoverRating || userRating) ? `${styles["star"]} ${styles["star-gold"]}` : styles["star"]}
                        >
                            ★
                        </span>
                    ))}
                </div>
                {userRating > 0 && (
                    <span style={{ fontSize: "13px", color: "#e8b84b" }}>
                        {["", "Poor", "Fair", "Good", "Great", "Masterpiece"][userRating]}
                    </span>
                )}
            </div>

            <div className={styles["comments-list"]}>
                {comments.map((comment) => (
                    <div key={comment.id} className={styles["comment-item"]}>
                        <div className={styles["comment-item-header"]}>
                            <div>
                                <div className={styles["comment-item-author"]}>{comment.author}</div>
                                <div className={styles["comment-item-date"]}>{comment.date}</div>
                            </div>
                            <StarRating rating={comment.rating} />
                        </div>
                        <p className={styles["comment-item-text"]}>"{comment.text}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
}