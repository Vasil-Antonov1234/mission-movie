import type { Review } from "../../types/types";
import styles from "./Reviews.module.css";
import ReviewCard from "./RviewCard";
import { Link } from "react-router";

const REVIEWS: Review[] = [
    {
        id: 1,
        title: "Anatomy of a Fall",
        rating: 4.5,
        excerpt:
            "A masterclass in ambiguity. Triet's courtroom drama buries its audience under layers of doubt, never letting them breathe until the final frame. A devastating and brilliant piece of cinema.",
        author: "Elena Marsh",
        date: "Mar 12, 2024",
        poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200&q=80",
    },
    {
        id: 2,
        title: "American Fiction",
        rating: 4.0,
        excerpt:
            "Cord Jefferson's debut is a razor-sharp satire that dares to bite the hand that feeds it. Jeffrey Wright is magnetic in every single scene — this is the role of his career.",
        author: "James Okafor",
        date: "Feb 28, 2024",
        poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&q=80",
    },
    {
        id: 3,
        title: "Society of the Snow",
        rating: 4.2,
        excerpt:
            "Bayona crafts a survival story with immense restraint and humanity. The film never exploits its true story — instead, it honors it. A gruelling, tender watch.",
        author: "Sofia Navarro",
        date: "Jan 15, 2024",
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&q=80",
    },
];

export default function Reviews() {
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
                {REVIEWS.map((review: Review) => (
                    <ReviewCard
                        key={review.id}
                        id={review.id}
                        title={review.title}
                        rating={review.rating}
                        excerpt={review.excerpt}
                        author={review.author}
                        date={review.date}
                        poster={review.poster}
                    />
                ))}
            </div>
            <Link to="/catalog/reviews" className={`${styles["section-link"]} ${styles["section-link-bottom"]}`}>All reviews →</Link>
        </section>
    )
}