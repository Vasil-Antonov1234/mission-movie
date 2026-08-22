import styles from "./CreateEditMovie.module.css";

export default function AttachCast() {

    const showImagePreview = true;
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ─── Page header ─── */}
                <div className={styles.pageEyebrow}>Movie - Cast Management</div>
                <h1 className={styles.pageTitle}>Add an actor to the "Breacing Bad" cast</h1>
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
                                    src="https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg"
                                    alt="Movie title"
                                    className={styles.posterImg}
                                />
                            </div>


                            {/* Live image preview */}
                            <div className={styles.posterPreviewWrapper}>
                                {showImagePreview ? (
                                    <img
                                        src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1151380190.jpg?crop=1xw:1.0xh;center,top&resize=640:*"
                                        alt="Image preview"
                                        className={styles.posterPreviewImg}
                                    // onBlur={validateHandler}
                                    />
                                ) : (
                                    <div className={styles.posterPreviewEmpty}>
                                        <span className={styles.posterPreviewIcon}>🎬</span>
                                        <span className={styles.posterPreviewText}>Image preview</span>
                                    </div>
                                )}
                            </div>
                            <label className={`${styles.label} ${styles.wrapp}`} htmlFor="cast">
                                Cast <span className={styles.required}>*</span>
                            </label>
                            <select name="cast" id="cast" className={styles.input}>
                                <option value="1" selected>Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
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