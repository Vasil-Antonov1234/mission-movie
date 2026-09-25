import { Activity, useContext, useEffect, useState } from "react";
import styles from "./MovieReview.module.css";
import { Link, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import type { Options, Review } from "../../types/types";
import UserContext from "../../contexts/UserContext";
import { errorMessageHandler } from "../../utils/errorUtil";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { convertDate } from "../../utils/convertDate";
import { calculateReviewTotalScore } from "../../utils/calculateReviewTotalScore";
import { toast } from "react-toastify";

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
    const { user, isAuthenticated } = useContext(UserContext);
    const { reviewId } = useParams();
    const { data: review, BASE_URL, request } = useFetch(`/reviews/${reviewId}`, initialState);
    const [hasWrittenReview, setHaswrittenReview] = useState(false);
    const [hasOwner, setHasOwner] = useState(false);
    const { data: other } = useFetch<Review[]>(`/reviews/for-movie/${review?.movieId}`, [])

    const isAdmin = user.role === "ADMIN";

    const otherReviews = other?.filter((x) => x.id !== review?.id);

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [disabledLikes, setDisabledLikes] = useState(false);

    useEffect(() => {
        if (review?.likes) {
            setLikeCount(review.likes.length)
        };

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

                if (isAuthenticated) {
                    const hasLikedResponse = await fetch(`${BASE_URL}/likes/has-liked/${reviewId}/${user.id}`, options);
                    const hasLiked: boolean = await hasLikedResponse.json();

                    setLiked(hasLiked);
                }

            } catch (error) {
                errorMessageHandler(error);
            };
        })();

        return () => {
            controller.abort();
        }

    }, [isAuthenticated, BASE_URL, review?.movie.id, user.accessToken, reviewId, review?.likes, user.id])

    const reviewScore = {
        director: review ? Number(review.directorScore) : 0,
        cinematography: review ? Number(review.cinematographyScore) : 0,
        performance: review ? Number(review.performanceScore) : 0,
        screenplay: review ? Number(review.screenplayScore) : 0
    };


    // Logged-in user
    // const { user } = useContext(UserContext);
    // const currentUser = { firstName: "Vasil", lastName: "Georgiev" };

    // const [comment, setComment] = useState("");
    // const [comments, setComments] = useState<Comment[]>([]);
    // const [submitting, setSubmitting] = useState(false);

    const handleLike = async () => {

        if (!isAuthenticated) {
            return
        };

        if (hasOwner) {
            return toast.warning("You cannot like your own review");
        };

        try {

            if (liked) {
                await request(`/likes/remove/${reviewId}`, "DELETE", { accessToken: user.accessToken });
            };

            if (!liked) {
                await request(`/likes/add`, "POST", { accessToken: user.accessToken }, { reviewId });
            };

            setLiked((state) => !state);
            setLikeCount((state) => liked ? state - 1 : state + 1);
            setDisabledLikes(true);

            setTimeout(() => {
                setDisabledLikes(false);
            }, 3000);

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

                            {/* Reviewer info */}
                            <div className={styles.reviewHeader}>
                                <div className={styles.reviewerInfo}>
                                    <div className={styles.reviewerAvatar}>
                                        {getInitials(review?.user.firstName, review?.user.lastName)}
                                    </div>
                                    <div>
                                        <div className={styles.reviewerName}>
                                            {review?.user.firstName} {review?.user.lastName}
                                        </div>
                                        <div className={styles.reviewerDate}>{convertDate(review?.createdAt)}</div>
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
                                    className={isAuthenticated ?
                                        `${styles.reaction} ${styles.reactionBtn}${liked ?
                                            ` ${styles.reactionBtnActive}` :
                                            ""}` :
                                        `${styles.reaction} ${styles.reactionBtnPassive}`}
                                    onClick={handleLike}
                                    disabled={disabledLikes}
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
                                <div className={styles.scoreRow}>
                                    <span className={styles.scoreRowLabel}>Director</span>
                                    <div className={styles.scoreBar}>
                                        <div
                                            className={styles.scoreBarFill}
                                            style={{ width: `${(reviewScore.director / 10) * 100}%` }}
                                        />
                                    </div>
                                    <span className={styles.scoreRowValue}>{reviewScore.director}</span>
                                </div>
                                <div className={styles.scoreRow}>
                                    <span className={styles.scoreRowLabel}>Cinematogr.</span>
                                    <div className={styles.scoreBar}>
                                        <div
                                            className={styles.scoreBarFill}
                                            style={{ width: `${(reviewScore.cinematography / 10) * 100}%` }}
                                        />
                                    </div>
                                    <span className={styles.scoreRowValue}>{reviewScore.cinematography}</span>
                                </div>
                                <div className={styles.scoreRow}>
                                    <span className={styles.scoreRowLabel}>Screenplay</span>
                                    <div className={styles.scoreBar}>
                                        <div
                                            className={styles.scoreBarFill}
                                            style={{ width: `${(reviewScore.screenplay / 10) * 100}%` }}
                                        />
                                    </div>
                                    <span className={styles.scoreRowValue}>{reviewScore.screenplay}</span>
                                </div>
                                <div className={styles.scoreRow}>
                                    <span className={styles.scoreRowLabel}>Performance</span>
                                    <div className={styles.scoreBar}>
                                        <div
                                            className={styles.scoreBarFill}
                                            style={{ width: `${(reviewScore.performance / 10) * 100}%` }}
                                        />
                                    </div>
                                    <span className={styles.scoreRowValue}>{reviewScore.performance}</span>
                                </div>
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
                                {otherReviews?.map((x) => (
                                    <Link to={`/review/${x.id}`} key={x.id} className={styles.moreReviewItem}>
                                        <div className={styles.moreReviewTitle}>By</div>
                                        <div className={styles.moreReviewMeta}>
                                            <span className={styles.moreReviewAuthor}>{`${x.user.firstName} ${x.user.lastName}`}</span>
                                        </div>
                                        <div className={styles.moreReviewMeta}>
                                            <span className={styles.moreReviewAuthor}>Total score</span>
                                            <span className={styles.moreReviewRating}>★ {
                                                calculateReviewTotalScore(x.cinematographyScore, x.directorScore, x.performanceScore, x.screenplayScore)}
                                            </span>
                                        </div>
                                        <span className={styles.moreReviewAuthor}>{convertDate(x.createdAt)}</span>
                                    </Link>
                                ))}
                            </div>
                            <Activity mode={isAdmin? "visible" : "hidden"}>
                                <ButtonSecondary clickHandler={() => { }} text="Delete" addStyle="btn-red" />
                            </Activity>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
