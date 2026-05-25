import { useState } from "react";
import styles from "./CommentsSection.module.css";
import type { CommentType } from "../../types/component.types";
import Comment from "./Comment";

type CommentsSectionProps = { comments: CommentType[] }

export default function CommentsSection({ comments }: CommentsSectionProps) {
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
                    <span className={styles["user-rating"]}>
                        {["", "Poor", "Fair", "Good", "Great", "Masterpiece"][userRating]}
                    </span>
                )}
            </div>

            <div className={styles["comments-list"]}>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
            </div>
        </section>
    );
}