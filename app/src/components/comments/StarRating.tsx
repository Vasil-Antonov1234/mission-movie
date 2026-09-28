import styles from "./Comment.module.css"

type StarRatingProps = { rating: number }

export default function StarRating({ rating }: StarRatingProps) {
    const filled = Math.round((rating / 10) * 10);
    return (
        <span className={styles["star-rating"]}>
            {"★".repeat(filled)}{"☆".repeat(10 - filled)}
        </span>
    );
}