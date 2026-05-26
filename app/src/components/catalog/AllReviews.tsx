import type { Review } from "../../types/types";
import ReviewCard from "../reviews/RviewCard";
import SelectionFilter from "../trending/SelectionFilter";
import styles from "./AllReviews.module.css";

const allReviews: Review[] = [
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
    {
        id: 4,
        title: "Is God Is",
        rating: 4.4,
        excerpt:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat error laboriosam aliquam aperiam obcaecati recusandae ab accusantium vel blanditiis delectus optio tempore ipsum esse perspiciatis, quaerat quibusdam beatae magnam dolorum quo illum non! Consectetur magni, alias beatae earum rerum odio.",
        author: "Sofia Navarro",
        date: "May 15, 2026",
        poster: "https://resizing.flixster.com/H-BsJxCvZurd6BZxRVOBxNKdC7s=/206x305/v2/https://resizing.flixster.com/JQfWKjnQxi07mkv1FViwPl8Dsrg=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2MxOGExOWEwLTgyY2ItNDBhZi04YjdlLTY2OGZiOTQ5M2Q4NC5qcGc=",
    },
    {
        id: 5,
        title: "Obsession",
        rating: 4.1,
        excerpt:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat error laboriosam aliquam aperiam obcaecati recusandae ab accusantium vel blanditiis delectus optio tempore ipsum esse perspiciatis, quaerat quibusdam beatae magnam dolorum quo illum non! Consectetur magni, alias beatae earum rerum odio.",
        author: "James Okafor",
        date: "April 14, 2026",
        poster: "https://resizing.flixster.com/dq6Rh_VzwnOIc-cxJsrpOopfg64=/206x305/v2/https://resizing.flixster.com/wciPMzUm5zbBhWKN24eGdoRfK8I=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzBlZDNhZmI5LTM3N2EtNGIyZC1iZTA5LTU0NzUyY2M2ZGYyYi5qcGc=",
    },
    {
        id: 6,
        title: "Obsession",
        rating: 4.1,
        excerpt:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat error laboriosam aliquam aperiam obcaecati recusandae ab accusantium vel blanditiis delectus optio tempore ipsum esse perspiciatis, quaerat quibusdam beatae magnam dolorum quo illum non! Consectetur magni, alias beatae earum rerum odio.",
        author: "James Okafor",
        date: "April 14, 2026",
        poster: "https://resizing.flixster.com/dq6Rh_VzwnOIc-cxJsrpOopfg64=/206x305/v2/https://resizing.flixster.com/wciPMzUm5zbBhWKN24eGdoRfK8I=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzBlZDNhZmI5LTM3N2EtNGIyZC1iZTA5LTU0NzUyY2M2ZGYyYi5qcGc=",
    },
    {
        id: 7,
        title: "Obsession",
        rating: 4.1,
        excerpt:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat error laboriosam aliquam aperiam obcaecati recusandae ab accusantium vel blanditiis delectus optio tempore ipsum esse perspiciatis, quaerat quibusdam beatae magnam dolorum quo illum non! Consectetur magni, alias beatae earum rerum odio.",
        author: "James Okafor",
        date: "April 14, 2026",
        poster: "https://resizing.flixster.com/dq6Rh_VzwnOIc-cxJsrpOopfg64=/206x305/v2/https://resizing.flixster.com/wciPMzUm5zbBhWKN24eGdoRfK8I=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzBlZDNhZmI5LTM3N2EtNGIyZC1iZTA5LTU0NzUyY2M2ZGYyYi5qcGc=",
    }
];

const options = ["All", "Latest by year", "Oldest by year", "Alphabetically"];

export default function AllReviews() {
    return (
        <section className={styles["review-section"]}>
            <h1 className={styles["section-heading-title"]}>Read new reviews</h1>
            <SelectionFilter options={options} />
            <div className={styles["reviews-container"]}>
                {allReviews.map((review) => (
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
        </section>
    );
}