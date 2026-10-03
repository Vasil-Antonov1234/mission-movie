import { Activity } from "react";
import useFetch from "../../hooks/useFetch";
import type { Review } from "../../types/types";
import styles from "./Reviews.module.css";
import ReviewCard from "./RviewCard";
import { Link } from "react-router";

export default function Reviews() {
    const { data } = useFetch<Review[]>("/reviews/latest", []);

    return (
        <>
            <section className={styles["reviews-section"]}>
                <div className={styles["section-header"]}>
                    <div>
                        <div className={`${styles["section-label"]} ${styles["section-label--spaced"]}`}>Latest reviews</div>
                        <Activity mode={data?.length ? "visible" : "hidden"}>
                            <h2 className={styles["section-heading"]}>You shared</h2>
                        </Activity>
                    </div>
                    <Link to="/reviews/catalog" className={`${styles["section-link"]} ${styles["section-link-top"]}`}>View all →</Link>
                </div>
                        <Activity mode={data?.length ? "hidden" : "visible"}>
                                <h2 className={styles["no-movies"]}>Nothing here yet</h2>
                        </Activity>
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
            </section>
        </>
    )
}