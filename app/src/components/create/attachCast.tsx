import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import styles from "./CreateEditMovie.module.css";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Artist } from "../../types/types";
import { errorMessageHandler } from "../../utils/errorUtil";
// import useForm from "../../hooks/useForm";

export default function AttachCast() {
    const movieId = useParams().movieId
    const { data: movie } = useFetch(`/movies/${movieId}?select=title%3D%22true%22&select=poster%3D%22true%22`, []);
    const [cast, setCast] = useState<Artist[]>([]);

    const initialValues = {
        cast: ""
    };
    const [data, setData] = useState(initialValues)

    useEffect(() => {
        const controller = new AbortController();


        (async () => {
            try {
                const response = await fetch("http://localhost:5000/casts", { signal: controller.signal });

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
    }, [])



    function changeHandler(event: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {        
        setData((state) => ({
            ...state,
            [event.target.name] : event.target.value
        }))
    }

    // const { formInputRegister, data } = useForm(initialValues)


    if (!movie || Array.isArray(movie)) {
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

                <form noValidate>

                    {/* ─── Card Attach ─── */}
                    <div className={styles.card}>

                        {/* Image URL */}
                        <div className={styles.movieField}>
                            <div className={styles.posterMovieWrapper}>
                                <img
                                    src={movie.poster}
                                    alt="Movie title"
                                    className={styles.posterImg}
                                />
                            </div>


                            {/* Live image preview */}
                            <div className={`${styles.posterPreviewWrapper} ${styles.posterPreviewCastWrapper}`}>
                                {showImagePreview ? (
                                    <img
                                        src={cast.find((x) => x.id === Number(data.cast))?.imageUrl}
                                        alt="Image preview"
                                        className={styles.posterPreviewImg}
                                    // onBlur={validateHandler}
                                    />
                                ) : (
                                    <div className={`${styles.posterPreviewEmpty} ${styles.posterPreviewCastWrapper}`}>
                                        <span className={styles.posterPreviewIcon}>🎬</span>
                                        <span className={styles.posterPreviewText}>Image preview</span>
                                    </div>
                                )}
                            </div>
                            <label className={`${styles.label} ${styles.wrapp}`} htmlFor="cast">
                                Cast <span className={styles.required}>*</span>
                            </label>
                            <select name="cast" onChange={(event) => changeHandler(event)} id="cast" className={styles.input}>
                                <option value="">----Select------</option>
                                {cast.map((x) => <option key={x.id} value={x.id}>{`${x.firstName} ${x.lastName}`}</option>)}
                            </select>
                        </div>

                    </div>

                    {/* ─── Actions ─── */}
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.btnSecondary}
                        // onClick={handleReset}
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