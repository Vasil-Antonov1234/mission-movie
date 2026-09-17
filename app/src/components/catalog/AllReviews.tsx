import { useState } from "react";
import type { Review } from "../../types/types";
import filterRecordsHandler from "../../utils/filterRecordsHandler";
import ReviewCard from "../reviews/RviewCard";
import SelectionFilter from "../trending/SelectionFilter";
import styles from "./AllReviews.module.css";
import useFetch from "../../hooks/useFetch";

const options = ["All", "Latest by year", "Oldest by year", "Alphabetically"];

export default function AllReviews() {
    const [activeReview, setActiveReviwe] = useState("All");
    const { data } = useFetch<Review[]>("/reviews", []);

    const filteredReviews = data ? filterRecordsHandler.filterReviews(data, activeReview) : [];

    return (
        <section className={styles["review-section"]}>
            <h1 className={styles["section-heading-title"]}>Read new reviews</h1>
            <SelectionFilter
                options={options}
                setSortBy={setActiveReviwe}
                activeState={activeReview} />
            <div className={styles["reviews-container"]}>
                {filteredReviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        cinematographyScore={review.cinematographyScore}
                        createdAt={review.createdAt}
                        directorScore={review.directorScore}
                        id={review.id}
                        likes={review.likes}
                        movieId={review.movieId}
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
    );
}