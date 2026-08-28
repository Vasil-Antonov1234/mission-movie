import { useNavigate, useParams, Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import styles from "./CreateEditMovie.module.css";
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import type { Actor, Movie, ValidateValue } from "../../types/types";
import { errorMessageHandler } from "../../utils/errorUtil";
import { validate } from "../../utils/validate";
import UserContext from "../../contexts/UserContext";
// import useForm from "../../hooks/useForm";

const initialStateMovie: Movie = {
    genre: "",
    poster: "",
    rating: 0,
    title: ""
}

export default function AttachCast() {
    const movieId = useParams().movieId
    const { data: movie, request } = useFetch(`/movies/${movieId}?select=title%3D%22true%22&select=poster%3D%22true%22`, initialStateMovie);
    const [cast, setCast] = useState<Actor[]>([]);
    const { user, onLogout } = useContext(UserContext);
    const navigate = useNavigate();

    const initialValues = {
        cast: "",
        nameInMovie: ""
    };
    const [data, setData] = useState(initialValues);
    const [errors, setErrors] = useState<ValidateValue>({});
    const [touched, setTouched] = useState<ValidateValue>({});

    useEffect(() => {
        const controller = new AbortController();


        (async () => {
            try {
                const response = await fetch(`http://localhost:5000/casts?where=movieId%3D%22${movieId}%22`, { signal: controller.signal });

                if (!response.ok) {
                    return {}
                };

                const result = await response.json();

                setCast(result);
            } catch (error) {
                errorMessageHandler(error);
            };
        })()

        return () => {
            controller.abort();
        }
    }, [movieId])

    const selectedActor = cast.find((x) => x.id === Number(data.cast));

    function changeHandler(event: ChangeEvent<HTMLSelectElement, HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        setData((state) => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    function validateHandler(event: React.BaseSyntheticEvent) {
        setTouched((state) => ({
            ...state,
            [event.target.name]: true
        }));

        const fieldErrors = validate(data);

        setErrors(fieldErrors);
    };

    function handleReset() {
        setTouched({});
        setErrors({});

        setData(initialValues);
    };

    async function actionHandler() {
        const fieldErrors = validate(data);
        setErrors(fieldErrors);
        setTouched(fieldErrors);

        if (Object.keys(fieldErrors).length > 0) {
            return;
        };

        setTouched({});
        setErrors({});

        try {
            const body = ({
                ...data,
                movieId
            });

            await request("/casts/attach", "POST", { accessToken: user.accessToken }, body);
            navigate(`/movies/${movieId}/details`);
        } catch (error) {
            const errorMessage = errorMessageHandler(error);

            if (errorMessage === "Invalid token") {
                onLogout("/login");
            };
        };
    }

    if (!movie) {
        return
    };

    const showImagePreview = data.cast ? true : false;

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ─── Page header ─── */}
                <div className={styles.pageEyebrow}>Movie - Cast Management</div>
                <h1 className={styles.pageTitle}>Add an actor to the "{movie.title}" cast</h1>
                <p className={styles.pageSubtitle}>
                    Fill in the details below to attach an actor to the cast.
                </p>

                <form action={actionHandler} noValidate>

                    {/* ─── Card Attach ─── */}
                    <div className={styles.card}>

                        {/* Movie information */}
                        <div className={styles.movieField}>
                            <div className={styles.posterMovieWrapper}>
                                <img
                                    src={movie.poster}
                                    alt="Movie title"
                                    className={styles.posterImg}
                                />
                            </div>


                            {/* Artist live image preview */}
                            <div className={`${styles.posterPreviewWrapper} ${styles.posterPreviewCastWrapper}`}>
                                {showImagePreview ? (
                                    <img
                                        src={cast.find((x) => x.id === Number(data.cast))?.imageUrl}
                                        alt="Image preview"
                                        className={styles.posterPreviewImg}
                                    />
                                ) : (
                                    <div className={`${styles.posterPreviewEmpty} ${styles.posterPreviewCastWrapper}`}>
                                        <span className={styles.posterPreviewIcon}>🎬</span>
                                        <span className={styles.posterPreviewText}>Image preview</span>
                                    </div>
                                )}
                            </div>

                            {/* Artist selection */}
                            <label className={`${styles.label} ${styles.wrapp}`} htmlFor="cast">
                                {data.cast === "" ? "Cast" :
                                    `${selectedActor?.firstName} ${selectedActor?.lastName}`
                                }
                                {data.cast === "" ? <span className={styles.required}>*</span> : ""}
                            </label>
                            <select
                                name="cast"
                                onChange={(event) => changeHandler(event)}
                                id="cast"
                                onBlur={validateHandler}
                                className={`${styles.input}${errors.cast && touched.cast ? ` ${styles["input--error"]}` : ""}`}>
                                <option value="">{data.cast === "" ? "----Select an artist----" : "----Change selection----"}</option>
                                {cast.map((x) => <option key={x.id} value={x.id}>{`${x.firstName} ${x.lastName}`}</option>)}
                            </select>
                            {touched.cast && <span className={styles.errorMsg}>{errors.cast}</span>}

                            {/* Switch to add cast */}
                            <p className={styles["create-switch"]} >
                                Cannot find who are you looking for?{" "}
                                <Link to="/casts/create" className={styles["section-link"]}>Create it  →</Link>
                            </p>

                            {/* Name in movie */}
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="nameInMovie">
                                    Name in movie <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="nameInMovie"
                                    name="nameInMovie"
                                    value={data.nameInMovie}
                                    onChange={changeHandler}
                                    type="text"
                                    className={`${styles.input}${errors.nameInMovie && touched.nameInMovie ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. Aragorn"
                                    onBlur={validateHandler}
                                />
                                {touched.nameInMovie && <span className={styles.errorMsg}>{errors.nameInMovie}</span>}
                            </div>
                        </div>

                    </div>

                    {/* ─── Actions ─── */}
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.btnSecondary}
                            onClick={handleReset}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.btnPrimary}
                        // disabled={loading}
                        >
                            Add an actor to the cast
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}