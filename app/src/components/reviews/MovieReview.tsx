import { Activity, useContext, useEffect, useState } from "react";
import styles from "./MovieReview.module.css";
import { Link, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import type { Options, Review } from "../../types/types";
import UserContext from "../../contexts/UserContext";
import { errorMessageHandler } from "../../utils/errorUtil";
import ButtonSecondary from "../buttons/ButtonSecondary";

// ─── TYPES ────────────────────────────────────────────────────────────────────

// interface Movie {
//   id: number;
//   title: string;
//   year: number;
//   director: string;
//   duration: string;
//   genres: string[];
//   poster: string;
//   backdrop: string;
// }

// interface Reviewer {
//   id: number;
//   firstName: string;
//   lastName: string;
// }

// interface ScoreBreakdown {
//   label: string;
//   value: number;
// }

// interface Comment {
//     id: number;
//     author: string;
//     text: string;
//     date: string;
//     likes: number;
// }

// interface OtherReview {
//   id: number;
//   title: string;
//   author: string;
//   rating: number;
// }

// interface Review {
//   id: number;
//   movie: Movie;
//   reviewer: Reviewer;
//   title: string;
//   body: string[];
//   rating: number;
//   hasSpoilers: boolean;
//   createdAt: string;
//   likes: number;
//   tags: string[];
//   scoreBreakdown: ScoreBreakdown[];
//   comments: Comment[];
//   otherReviews: OtherReview[];
// }

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO
// Replace with data fetched via useParams() + API call:
// const { id } = useParams();
// const [review, setReview] = useState(null);
// useEffect(() => { fetch(`/api/reviews/${id}`).then(...).then(setReview) }, [id]);

// const MOCK_REVIEW: Review = {
//   id: 1,
//   movie: {
//     id: 1,
//     title: "Oppenheimer",
//     year: 2023,
//     director: "Christopher Nolan",
//     duration: "3h 0m",
//     genres: ["Drama", "History", "Thriller"],
//     poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
//     backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1400&q=80",
//   },
//   reviewer: {
//     id: 2,
//     firstName: "Elena",
//     lastName: "Marsh",
//   },
//   title: "A Towering Achievement in Cinema",
//   body: [
//     "Christopher Nolan has never been more controlled or more explosive. Oppenheimer is a film that refuses to let you look away — from the science, from the politics, from the man at the centre of it all. Cillian Murphy gives the performance of his generation, inhabiting Oppenheimer's brilliance and his guilt with equal, devastating precision.",
//     "The Trinity sequence alone is worth the price of admission. Nolan renders the unknowable tangible in a way only cinema can — the absence of sound before the shockwave arrives is one of the most terrifying moments I have experienced in a theatre. It is not a film about the bomb. It is a film about a man who understood exactly what he had done.",
//     "If it stumbles anywhere, it is in the courtroom sequences, which pale somewhat against the volcanic energy of the first two acts. But this is a minor complaint. Three hours that feel like thirty minutes. Dense, demanding, and utterly devastating.",
//   ],
//   rating: 9.5,
//   hasSpoilers: false,
//   createdAt: "August 3, 2023",
//   likes: 214,
//   tags: ["biopic", "war", "historical", "masterpiece", "nolan"],
//   scoreBreakdown: [
//     { label: "Direction", value: 10 },
//     { label: "Performance", value: 10 },
//     { label: "Screenplay", value: 9 },
//     { label: "Cinematogr.", value: 10 },
//     { label: "Score", value: 9 },
//   ],
//   comments: [
//     {
//       id: 1,
//       author: "James O.",
//       text: "Completely agree about the Trinity sequence — I had to remind myself to breathe.",
//       date: "Aug 5, 2023",
//       likes: 18,
//     },
//     {
//       id: 2,
//       author: "Sofia N.",
//       text: "The courtroom scenes worked for me actually — I think the contrast was intentional. Great review though.",
//       date: "Aug 7, 2023",
//       likes: 9,
//     },
//     {
//       id: 3,
//       author: "Vasil G.",
//       text: "Murphy was incredible. Best performance of 2023 without question.",
//       date: "Aug 9, 2023",
//       likes: 24,
//     },
//   ],
//   otherReviews: [
//     { id: 2, title: "History Rendered Visceral", author: "James O.", rating: 8.5 },
//     { id: 3, title: "Nolan at His Most Restrained", author: "Sofia N.", rating: 7.5 },
//     { id: 4, title: "Overwhelming in the Best Way", author: "Vasil G.", rating: 9.0 },
//   ],
// };

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getInitials(firstName: string | undefined, lastName: string | undefined): string {

    if (!firstName || !lastName) {
        return "JD"
    };

    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// function StarRating({ rating }: { rating: number }) {
//   const filled = Math.round((rating / 10) * 5);
//   return (
//     <span className={styles.reviewStars}>
//       {"★".repeat(filled)}{"☆".repeat(5 - filled)}
//     </span>
//   );
// }

const initialState: Review = {
    cinematographyScore: "",
    createdAt: "",
    directorScore: "",
    id: "0",
    movieId: "0",
    performanceScore: "",
    review: "",
    likes: [],
    screenplayScore: "",
    userId: "0",
    movie: {
        id: "0",
        poster: "",
        title: ""
    },
    user: {
        id: "0",
        email: "",
        firstName: "",
        lastName: ""
    }
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function MovieReview() {
    // const review = MOCK_REVIEW;
    const { user, isAuthenticated } = useContext(UserContext);
    const { reviewId } = useParams();
    const { data: review, BASE_URL, request } = useFetch(`/reviews/${reviewId}`, initialState);
    const [hasWrittenReview, setHaswrittenReview] = useState<boolean>(false);
    const [hasOwner, setHasOwner] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        };

        const controller = new AbortController();
        (async () => {
            try {
                const options: Options = {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        authorization: user.accessToken
                    },
                    signal: controller.signal
                };

                const hasOwnerResponse = await fetch(`${BASE_URL}/reviews/${review?.movie.id}/${reviewId}/hasOwner`, options);
                const hasWrittenReviewResponse = await fetch(`${BASE_URL}/reviews/${review?.movie.id}/hasWrittenReview`, options);

                const hasWrittenReview: boolean = await hasWrittenReviewResponse.json();
                const hasOwner: boolean = await hasOwnerResponse.json();
                setHaswrittenReview(hasWrittenReview);
                setHasOwner(hasOwner);
            } catch (error) {
                errorMessageHandler(error);
            };
        })();

        return () => {
            controller.abort();
        }

    }, [isAuthenticated, BASE_URL, review?.movie.id, user.accessToken, reviewId])


    // Logged-in user
    // const { user } = useContext(UserContext);
    // const currentUser = { firstName: "Vasil", lastName: "Georgiev" };

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(review?.likes.length || 0);
    // const [likeCount, setLikeCount] = useState(Number(review?.likes));
    
    // const [comment, setComment] = useState("");
    // const [comments, setComments] = useState<Comment[]>([]);
    // const [submitting, setSubmitting] = useState(false);

    const handleLike = async () => {
        try {
            // await request(`/likes/add`, "POST", { accessToken: user.accessToken }, user.id);
            
            setLiked((prev) => !prev);
            setLikeCount((prev) => liked ? prev - 1 : prev + 1);
        } catch (error) {
            errorMessageHandler(error);
        };
    };

    // const handleCommentSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     if (!comment.trim()) return;
    //     setSubmitting(true);

    //     // TODO: replace with API call:
    //     // await fetch(`/api/reviews/${review.id}/comments`, {
    //     //   method: "POST",
    //     //   headers: { "Content-Type": "application/json", authorization: accessToken },
    //     //   body: JSON.stringify({ text: comment }),
    //     // });

    //     await new Promise((r) => setTimeout(r, 600));

    //     const newComment: Comment = {
    //         id: Date.now(),
    //         author: `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`,
    //         text: comment.trim(),
    //         date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    //         likes: 0,
    //     };

    //     setComments((state) => [...state, newComment]);
    //     setComment("");
    //     setSubmitting(false);
    // };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ─── Eyebrow ─── */}
                <div className={styles.pageEyebrow}>Film Review</div>

                {/* ─── LAYOUT ─── */}
                <div className={styles.layout}>

                    {/* ── MAIN COLUMN ── */}
                    <main className={styles.main}>

                        {/* Movie banner */}
                        <div className={styles.movieBanner}>
                            <div
                                className={styles.movieBannerBackdrop}
                                style={{ backgroundImage: `url(${review?.movie.poster})` }}
                            />
                            <div className={styles.movieBannerContent}>
                                <img
                                    src={review?.movie.poster}
                                    alt={review?.movie.title}
                                    className={styles.moviePoster}
                                />
                                <div className={styles.movieInfo}>
                                    <div className={styles.movieTitle}>{review?.movie.title}</div>
                                    <div className={styles.movieMeta}>
                                        <span className={styles.movieMetaItem}>{review?.movie.year}</span>
                                        <span className={styles.movieMetaDot}>·</span>
                                        <span className={styles.movieMetaItem}>{review?.movie.duration}</span>
                                        <span className={styles.movieMetaDot}>·</span>
                                        <span className={styles.movieMetaItem}>{review?.movie.director}</span>
                                    </div>
                                    <div className={styles.movieGenreTags}>
                                        {review?.movie.genre?.split(", ").map((g) => (
                                            <span key={g} className={styles.movieGenreTag}>{g}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── Review card ─── */}
                        <div className={styles.card}>

                            {/* Spoiler warning */}
                            {/* {{
                                review.hasSpoilers && (
                                    <div className={styles.spoilerBanner}>
                                        ⚠ This review contains spoilers
                                    </div>
                                )
                            }} */}

                            {/* Reviewer info + rating */}
                            <div className={styles.reviewHeader}>
                                <div className={styles.reviewerInfo}>
                                    <div className={styles.reviewerAvatar}>
                                        {getInitials(review?.user.firstName, review?.user.lastName)}
                                    </div>
                                    <div>
                                        <div className={styles.reviewerName}>
                                            {review?.user.firstName} {review?.user.lastName}
                                        </div>
                                        <div className={styles.reviewerDate}>{review?.createdAt}</div>
                                    </div>
                                </div>
                                {/* {<div className={styles.reviewRatingBlock}>
                                    <div className={styles.reviewRatingBadge}>★ {review.rating}</div>
                                    <StarRating rating={review.rating} />
                                </div>} */}
                            </div>

                            {/* Review title */}
                            <h1 className={styles.reviewTitle}>{review?.movie.title}</h1>

                            {/* Review body */}
                            <div className={styles.reviewBody}>
                                {/* {{
                                    review.body.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))
                                }} */}
                                {review?.review}
                            </div>

                            <hr className={styles.reviewDivider} />

                            {/* Tags */}
                            {/* {<div className={styles.tagsList} style={{ marginBottom: "20px" }}>
                                {review.tags.map((tag) => (
                                    <button key={tag} className={styles.tag}># {tag}</button>
                                ))}
                            </div>} */}

                            {/* Reactions */}
                            <div className={styles.reactions}>
                                <span className={styles.reactionsLabel}>React:</span>
                                <button
                                    className={`${styles.reactionBtn}${liked ? ` ${styles.reactionBtnActive}` : ""}`}
                                    onClick={handleLike}
                                >
                                    ♥ <span className={styles.reactionCount}>{likeCount}</span>
                                </button>
                            </div>
                        </div>

                        <Activity mode={hasOwner ? "visible" : "hidden"}>
                            <Link to={`/reviews/${reviewId}/edit`}>
                                <ButtonSecondary text="Edit" />
                            </Link>
                        </Activity>

                        {/* ─── Comments card ─── */}
                        {/* <div className={styles.card}> */}
                        {/* <div className={styles.cardTitle}>
                                Discussion · {comments.length} comment{comments.length !== 1 ? "s" : ""}
                            </div> */}

                        {/* Comments list */}
                        {/* {comments.length > 0 && (
                                <div className={styles.commentsList}>
                                    {comments.map((c) => (
                                        <div key={c.id} className={styles.commentItem}>
                                            <div className={styles.commentAvatar}>
                                                {c.author.charAt(0).toUpperCase()}
                                            </div>
                                            <div className={styles.commentBody}>
                                                <div className={styles.commentBubble}>
                                                    <div className={styles.commentAuthor}>{c.author}</div>
                                                    <div className={styles.commentText}>{c.text}</div>
                                                </div>
                                                <div className={styles.commentMeta}>
                                                    <span>{c.date}</span>
                                                    <button className={styles.commentLikeBtn}>
                                                        ♥ {c.likes}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )} */}

                        {/* Comment form */}
                        {/* <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
                                <div className={styles.commentFormAvatar}>
                                    {getInitials(currentUser.firstName, currentUser.lastName)}
                                </div>
                                <div className={styles.commentFormInner}>
                                    <textarea
                                        className={styles.commentInput}
                                        placeholder="Share your thoughts on this review…"
                                        value={comment}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                                        rows={3}
                                    />
                                    <div className={styles.commentFormActions}>
                                        <button
                                            type="submit"
                                            className={styles.btnPrimary}
                                            disabled={submitting || !comment.trim()}
                                        >
                                            {submitting ? "Posting…" : "Post comment"}
                                        </button>
                                    </div>
                                </div>
                            </form> */}
                        {/* </div> */}

                    </main>

                    {/* ── SIDEBAR ── */}
                    <aside className={styles.sidebar}>

                        {/* Write your own review CTA */}
                        <Activity mode={hasWrittenReview ? "hidden" : "visible"}>
                            <div className={styles.writeReviewCta}>
                                <div className={styles.writeReviewCtaText}>
                                    Have you seen <strong>{review?.movie.title}</strong>? Share your own take.
                                </div>
                                <Link to={`/reviews/${review?.movie.id}/create`}>
                                    <button className={styles.btnSecondary}>
                                        ✍ Write a review
                                    </button>
                                </Link>
                            </div>
                        </Activity>

                        {/* Score breakdown */}
                        <div className={styles.sidebarCard}>
                            <div className={styles.sidebarCardTitle}>Score Breakdown</div>
                            <div className={styles.scoreBreakdown}>
                                {/* {{
                                    review.scoreBreakdown.map((row) => (
                                        <div key={row.label} className={styles.scoreRow}>
                                            <span className={styles.scoreRowLabel}>{row.label}</span>
                                            <div className={styles.scoreBar}>
                                                <div
                                                    className={styles.scoreBarFill}
                                                    style={{ width: `${(row.value / 10) * 100}%` }}
                                                />
                                            </div>
                                            <span className={styles.scoreRowValue}>{row.value}</span>
                                        </div>
                                    ))
                                }} */}
                            </div>
                        </div>

                        {/* Other reviews for this movie */}
                        <div className={styles.sidebarCard}>
                            <div className={styles.sidebarCardTitle}>More Reviews</div>
                            <div className={styles.moreReviewsList}>
                                {/* {{
                                    review.otherReviews.map((r) => (
                                        <div key={r.id} className={styles.moreReviewItem}>
                                            <div className={styles.moreReviewTitle}>{r.title}</div>
                                            <div className={styles.moreReviewMeta}>
                                                <span className={styles.moreReviewAuthor}>{r.author}</span>
                                                <span className={styles.moreReviewRating}>★ {r.rating}</span>
                                            </div>
                                        </div>
                                    ))
                                }} */}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
