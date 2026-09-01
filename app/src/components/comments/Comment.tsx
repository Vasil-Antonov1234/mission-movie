import type { CommentData } from "../../types/types";
import styles from "./Comment.module.css";

type StarRatingProps = { rating: number }

function StarRating({ rating }: StarRatingProps) {
    const filled = Math.round((rating / 5) * 5);
    return (
        <span className={styles["star-rating"]}>
            {"★".repeat(filled)}{"☆".repeat(5 - filled)}
        </span>
    );
}

type CommentProps = { comment: CommentData };

export default function Comment({ comment }: CommentProps) {
    return (
        <div className={styles["comment-item"]}>
            <div className={styles["comment-item-header"]}>
                <div>
                    <div className={styles["comment-item-author"]}>{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</div>
                    <div className={styles["comment-item-date"]}>{comment.createdAt}</div>
                </div>
                <StarRating rating={4} />
            </div>
            <p className={styles["comment-item-text"]}>"{comment.content}"</p>
        </div>
    )
}