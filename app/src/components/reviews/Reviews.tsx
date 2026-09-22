import useFetch from "../../hooks/useFetch";
import type { Review } from "../../types/types";
import styles from "./Reviews.module.css";
import ReviewCard from "./RviewCard";
import { Link } from "react-router";

export default function Reviews() {
    const { data } = useFetch<Review[]>("/reviews/latest", []);

    return (
        <section className={styles["reviews-section"]}>
            <div className={styles["section-header"]}>
                <div>
                    <div className={`${styles["section-label"]} ${styles["section-label--spaced"]}`}>Latest reviews</div>
                    <h2 className={styles["section-heading"]}>From our critics</h2>
                </div>
                <Link to="/reviews/catalog" className={`${styles["section-link"]} ${styles["section-link-top"]}`}>All reviews →</Link>
            </div>
            <div className={styles["reviews-container"]}>
                {data?.map((review: Review) => (
                    <ReviewCard
                        key={review.id}
                        cinematographyScore={review.cinematographyScore}
                        createdAt={review.createdAt}
                        directorScore={review.directorScore}
                        id={review.id}
                        movieId={review.movieId}
                        likes={review.likes}
                        performanceScore={review.performanceScore}
                        review={review.review}
                        screenplayScore={review.screenplayScore}
                        userId={review.userId}
                        movie={review.movie}
                        user={review.user}
                    />
                ))}
            </div>
            <Link to="/catalog/reviews" className={`${styles["section-link"]} ${styles["section-link-bottom"]}`}>All reviews →</Link>
        </section>
    )
}