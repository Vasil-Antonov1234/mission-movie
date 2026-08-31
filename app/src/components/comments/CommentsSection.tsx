import { Activity, useContext, useEffect, useReducer, useState } from "react";
import styles from "./CommentsSection.module.css";
import type { CommentData, CommentType } from "../../types/types";
import Comment from "./Comment";
import ButtonPrimary from "../buttons/ButtonPrimary";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router";
import { errorMessageHandler } from "../../utils/errorUtil";
import useFetch from "../../hooks/useFetch";

type CommentsSectionProps = { comments: CommentType[], owner: boolean, onComment: (formData: FormData) => Promise<void> }

type Action = {
    type: string,
    payload: CommentData[]
};

function commentReducer(state: CommentData[], action: Action): CommentData[] {
    switch(action.type) {
        case "GET_ALL":
            return action.payload;
        default:
            return state;
    }
}

export default function CommentsSection({ comments, owner, onComment }: CommentsSectionProps) {
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { isAuthenticated } = useContext(UserContext);
    const [commentsData, dispatch] = useReducer(commentReducer, []);
    const { request } = useFetch();

    // console.log(commentsData)

    const movieId = useParams().movieId

    useEffect(() => {
        (async () => {

            try {
                const result = await request(`/comments/${movieId}`, "GET");

                dispatch({
                    type: "GET_ALL",
                    payload: result
                });
            } catch (error) {
                errorMessageHandler(error);
            };
        })()
    }, [])

    return (
        <section className={styles["comments-section"]}>
            <div className={styles["section-label"]}>Community</div>
            <h2 className={styles["synopsis-heading"]}>Comments</h2>

            {/* Rate this film */}
            <Activity mode={isAuthenticated && !owner ? "visible" : "hidden"}>
                <form className={styles["rate-film-container"]} action={onComment}>
                    <div className={styles["rate-wrapper"]}>
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
                        <ButtonPrimary text="Rate" />
                    </div>
                    <div className={styles["rate-wrapper"]}>
                        <textarea className={styles["comment-item"]} placeholder="Write a comment..." name="content"></textarea>
                        <ButtonPrimary text="Submit" />
                    </div>
                </form>
            </Activity>

            <div className={styles["comments-list"]}>
                {commentsData.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </section>
    );
}