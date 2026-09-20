import { useContext, useState } from "react"
import styles from "./CreateEditMovie.module.css"
import useForm from "../../hooks/useForm"
import useFetch from "../../hooks/useFetch"
import type { Review, ValidateValue } from "../../types/types"
import { validate } from "../../utils/validate"
import UserContext from "../../contexts/UserContext"
import { errorMessageHandler } from "../../utils/errorUtil"
import { useNavigate, useParams } from "react-router"

type Movie = {
    id: number,
    title: string,
    poster: string
}

const initialValues = {
    content: "",
    movieId: "",
    directorScore: "0",
    performanceScore: "0",
    screenplayScore: "0",
    cinematographyScore: "0"
};

const initialStateMovies: Movie[] = [];
// const initialStateReview: Review = {
//     cinematographyScore: "",
//     createdAt: "",
//     directorScore: "",
//     id: "0",
//     likes: "0",
//     movieId: "0",
//     performanceScore: "",
//     review: "",
//     screenplayScore: "",
//     userId: "",
//     movie: {
//         id: "0",
//         poster: "",
//         title: "",
//     },
//     user: {
//         id: "0",
//         email: "",
//         firstName: "",
//         lastName: ""
//     }
// }

type CurrentMovie = {
    id: string,
    title: string,
    poster: string
}

const initialStateMovie: CurrentMovie = {
    id: "0",
    title: "",
    poster: ""
}

export default function CreateReview() {
    // const { reviewId } = useParams();
    const movieId = useParams().movieId;

    // const { data: movies, request } = useFetch("/movies?where=activePage%3D%22null%22&select=id%3D%22true%22&select=title%3D%22true%22&select=poster%3D%22true%22", initialStateMovies);
    const { user, onLogout } = useContext(UserContext);
    const { data: movies, request } = useFetch("/movies/exclude/reviewed", initialStateMovies, { accessToken: user.accessToken });
    const { data, formInputRegister, setData } = useForm(initialValues);
    const [errors, setErrors] = useState<ValidateValue>({});
    const [touched, setTouched] = useState<ValidateValue>({});
    const navigate = useNavigate();

    // const id = reviewId ? reviewId : 0;
    // const { data: currentReview } = useFetch(`/reviews/${id}`, initialStateReview);

    const id = movieId ? movieId : 0;
    const { data: currentMovie } = useFetch(`/movies/${id}`, initialStateMovie);

    function validateHandler(event: React.BaseSyntheticEvent) {
        setTouched((state) => ({
            ...state,
            [event.target.name]: true
        }));

        const fieldErrors = validate(data);
        setErrors(fieldErrors);
    }

    function onReset() {
        setData(initialValues);
        setTouched({})
        setErrors({});
    };

    async function actionHandler() {
        
        if (movieId && currentMovie) {
            data.movieId = movieId
        }

        const fieldErrors = validate(data);
        setErrors(fieldErrors);
        setTouched(fieldErrors);

        if (Object.keys(fieldErrors).length > 0) {
            return;
        };

        try {
            const result = await request(`/reviews/create`, "POST", { accessToken: user.accessToken }, data);

            navigate("/");
        } catch (error) {
            const errorMessage = errorMessageHandler(error);

            if (errorMessage === "Invalid token") {
                onLogout("/login");
            };
        };
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

                <form action={actionHandler} noValidate>

                    <div className={styles.card}>
                        <label className={`${styles.label} ${styles.wrapp}`} htmlFor="movieId">
                        </label>
                        <select
                            {...formInputRegister("movieId")}
                            id="movieId"
                            onBlur={validateHandler}
                            className={`${styles.input} ${errors.movieId && !movieId ? `${styles["input--error"]}` : ""}`}>
                            {movieId ? <option value={movieId}>{currentMovie?.title}</option> : <option value="">----Select a movie----</option>}
                            {movieId ? "" : movies?.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}
                        </select>
                        {errors.movieId && !movieId && <span className={styles.errorMsg}>{errors.movieId}</span>}
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
                                    : movieId ? 
                                    <img
                                        src={currentMovie?.poster}
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

                    {/* Rates */}
                    {/* Director */}
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="directorScore">
                            Director Rating
                        </label>
                        <div className={styles.ratingRow}>
                            <input
                                id="directorScore"
                                {...formInputRegister("directorScore")}
                                type="range"
                                min={1}
                                max={10}
                                step={1}
                                className={styles.ratingSlider}
                            />
                            <span className={styles.ratingBadge}>★ {Number(data.directorScore).toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Performance */}
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="performanceScore">
                            Performance Rating
                        </label>
                        <div className={styles.ratingRow}>
                            <input
                                id="performanceScore"
                                {...formInputRegister("performanceScore")}
                                type="range"
                                min={1}
                                max={10}
                                step={1}
                                className={styles.ratingSlider}
                            />
                            <span className={styles.ratingBadge}>★ {Number(data.performanceScore).toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Screenplay */}
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="screenplayScore">
                            Screenplay Rating
                        </label>
                        <div className={styles.ratingRow}>
                            <input
                                id="screenplayScore"
                                {...formInputRegister("screenplayScore")}
                                type="range"
                                min={1}
                                max={10}
                                step={1}
                                className={styles.ratingSlider}
                            />
                            <span className={styles.ratingBadge}>★ {Number(data.screenplayScore).toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Cinamatography */}
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="cinematographyScore">
                            Cinematography Rating
                        </label>
                        <div className={styles.ratingRow}>
                            <input
                                id="cinematographyScore"
                                {...formInputRegister("cinematographyScore")}
                                type="range"
                                min={1}
                                max={10}
                                step={1}
                                className={styles.ratingSlider}
                            />
                            <span className={styles.ratingBadge}>★ {Number(data.cinematographyScore).toFixed(1)}</span>
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