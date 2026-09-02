import { Activity, useContext, useEffect, useReducer, useState } from "react";
import styles from "./CommentsSection.module.css";
import type { CommentData } from "../../types/types";
import Comment from "./Comment";
import ButtonPrimary from "../buttons/ButtonPrimary";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router";
import { errorMessageHandler } from "../../utils/errorUtil";
import useFetch from "../../hooks/useFetch";

type CommentsSectionProps = { owner: boolean }

type Action = {
    type: string,
    payload: CommentData[]
};

function commentReducer(state: CommentData[], action: Action): CommentData[] {
    switch (action.type) {
        case "GET_ALL":
            return action.payload;
        case "ADD_COMMENT":
            function test(state: CommentData[]): CommentData[] {
                return [...state, action.payload[0]]
            }
            return test(state)
        default:
            return state;
    }
}

export default function CommentsSection({ owner }: CommentsSectionProps) {
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { isAuthenticated } = useContext(UserContext);
    const [commentsData, dispatch] = useReducer(commentReducer, []);
    const { request } = useFetch();
    const { user } = useContext(UserContext)

    const movieId = useParams().movieId

    async function commentHandler(formData: FormData) {
        const content: string | null | File = formData.get("content");

        if (!content || (content && typeof (content) === "string" && !content.trim())) {
            return;
        };

        const commentData = {
            content,
            movieId
        }

        try {
            const newComment = await request("/comments/create", "POST", { accessToken: user.accessToken }, commentData);
            const newCommentData: CommentData = {
                ...newComment,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }

            dispatch({
                type: "ADD_COMMENT",
                payload: [newCommentData]
            });
        } catch (error) {
            errorMessageHandler(error);
        };
    }

    useEffect(() => {
        (async () => {

            try {
                const result: CommentData[] = await request(`/comments/${movieId}`, "GET");

                dispatch({
                    type: "GET_ALL",
                    payload: result
                });
            } catch (error) {
                errorMessageHandler(error);
            };
        })()
    }, []);

    async function rateHandler() {
        try {
            await request(`/rate/${movieId}`, "POST", { accessToken: user.accessToken }, userRating);
            
        } catch (error) {
            errorMessageHandler(error);
        };
    }

    return (
        <section className={styles["comments-section"]}>
            <div className={styles["section-label"]}>Community</div>
            <h2 className={styles["synopsis-heading"]}>Comments</h2>

            {/* Rate this film */}
            <Activity mode={isAuthenticated && !owner ? "visible" : "hidden"}>
                <form className={styles["rate-film-container"]} action={commentHandler}>
                    <div className={styles["rate-wrapper"]}>
                        <span className={styles["rate-film-label"]}>Rate this film:</span>
                        <div className={styles["stars-container"]}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
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
                                {["", "Poor", "Poor", "Fair", "Fair", "Fair", "Good", "Good", "Great", "Great", "Masterpiece"][userRating]}
                            </span>
                        )}
                        <ButtonPrimary text="Rate" clickHandler={rateHandler}/>
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