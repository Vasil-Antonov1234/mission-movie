import { useState } from "react"
import styles from "./CreateEditMovie.module.css"
import useForm from "../../hooks/useForm"
import useFetch from "../../hooks/useFetch"
import type { ValidateValue } from "../../types/types"
import { validate } from "../../utils/validate"

type Movie = {
    id: number,
    title: string,
    poster: string
}

const initialValues = {
    content: "",
    movieId: ""
};

const initialStateMovies: Movie[] = []

export default function CreateReview() {
    const { data: movies } = useFetch("/movies?where=activePage%3D%22null%22&select=id%3D%22true%22&select=title%3D%22true%22&select=poster%3D%22true%22", initialStateMovies);
    const { data, formInputRegister, setData } = useForm(initialValues);
    const [errors, setErrors] = useState<ValidateValue>({});
    const [touched, setTouched] = useState<ValidateValue>({});

    function validateHandler(event: React.BaseSyntheticEvent) {
        setTouched((state) => ({
            ...state,
            [event.target.name]: true
        }));

        const fieldErrors = validate(data);
        setErrors(fieldErrors);
    }

    function onReset () {
        setData(initialValues);
    };

    function submitAction() {

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ─── Page header ─── */}
                <div className={styles.pageEyebrow}>Reviews</div>
                <h1 className={styles.pageTitle}>Write your review</h1>
                <p className={styles.pageSubtitle}>
                    Select a movie and share your opinion about it.
                </p>

                <form noValidate>

                    <div className={styles.card}>
                        <label className={`${styles.label} ${styles.wrapp}`} htmlFor="movieId">
                        </label>
                        <select
                            {...formInputRegister("movieId")}
                            id="movieId"
                            className={styles.input}>
                            <option value="">----Select a movie----</option>
                            {movies?.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}
                        </select>
                    </div>

                    {/* Media */}
                    <div className={styles.card}>

                        {/* Image URL */}
                        <div className={styles.movieField}>

                            {/* Live image preview */}
                            <div className={`${styles.posterMovieWrapper} ${styles.posterMovieWrapperBig} ${data.movieId ? "" : styles.posterPreviewIconBig}`}>
                                {data.movieId ?
                                    <img
                                        src={movies?.find((x) => x.id === Number(data.movieId))?.poster}
                                        alt="poster"
                                        className={styles.posterImg}
                                    />
                                    :
                                    <div className={styles.posterPreviewEmpty}>
                                        <span className={`${styles.posterPreviewIcon}`}>🎬</span>
                                        <span className={styles.posterPreviewText}>Poster</span>
                                    </div>
                                }
                            </div>
                            <p className={styles.label}>{movies?.find((x) => x.id === Number(data.movieId))?.title}</p>
                        </div>
                    </div>

                    {/* Review */}
                    <div className={styles.card}>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="content">
                                Your review
                            </label>
                            <textarea
                                {...formInputRegister("content")}
                                id="content"
                                className={`${styles.textarea} ${errors.content && touched.content ? `${styles["input--error"]}` : ""}`}
                                placeholder="Write here..."
                                rows={5}
                                onBlur={validateHandler}
                            />
                            {touched.content && <span className={styles.errorMsg}>{errors.content}</span>}
                            <span className={styles.inputHint}>
                                {data.content.trim().length} characters
                                {data.content.trim().length > 0 && data.content.trim().length < 70
                                    ? ` — ${70 - data.content.trim().length} more needed`
                                    : ""}
                            </span>
                        </div>
                    </div>

                    {/* ─── Actions ─── */}
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.btnSecondary}
                            onClick={onReset}
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className={styles.btnPrimary}
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}