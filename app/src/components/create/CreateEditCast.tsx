import { useState } from "react";
import useForm from "../../hooks/useForm";
import styles from "./CreateEditMovie.module.css";
import type { ValidateValue } from "../../types/types";
import { validate } from "../../utils/validate";

const initialValues = {
    firstName: "",
    lastName: "",
    bornDate: "",
    placeOfBorn: "",
    imageUrl: ""
};

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export default function CreateEditCast() {
    const { data, setData, formInputRegister } = useForm(initialValues);
    const [errors, setErrors] = useState<ValidateValue>({});
    const [touched, setTouched] = useState<ValidateValue>({});

    function actionHandler() {
        console.log("submited")
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
        setErrors({});
        setTouched({});

        setData(initialValues);
    }

    const showImagePreview = data.imageUrl.trim() !== "" && isValidUrl(data.imageUrl);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ─── Page header ─── */}
                <div className={styles.pageEyebrow}>Cast Management</div>
                <h1 className={styles.pageTitle}>Add a new actor</h1>
                <p className={styles.pageSubtitle}>
                    Fill in the details below to add an actor to the collection.
                </p>

                <form action={actionHandler} noValidate>

                    {/* ─── Card 1: Personal info ─── */}
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Personal information</div>

                        <div className={styles.formGrid}>

                            {/* First name */}
                            <div className={`${styles.field} ${styles.colSpan2}`}>
                                <label className={styles.label} htmlFor="title">
                                    Title <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="title"
                                    {...formInputRegister("firstName")}
                                    type="text"
                                    className={`${styles.input}${errors.title && touched.title ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. Oppenheimer"
                                    autoComplete="off"
                                    onBlur={validateHandler}
                                />
                                {touched.title && <span className={styles.errorMsg}>{errors.title}</span>}
                            </div>

                            {/* Last name */}
                            <div className={`${styles.field} ${styles.colSpan2}`}>
                                <label className={styles.label} htmlFor="tagline">
                                    Tagline <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="tagline"
                                    {...formInputRegister("lastName")}
                                    type="text"
                                    className={`${styles.input}${errors.tagline && touched.tagline ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. A Brand New Day starts now."
                                    autoComplete="off"
                                    onBlur={validateHandler}
                                />
                                {touched.tagline && <span className={styles.errorMsg}>{errors.tagline}</span>}
                            </div>

                            {/* Birthday */}
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="director">
                                    Director <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="director"
                                    {...formInputRegister("bornDate")}
                                    type="text"
                                    className={`${styles.input}${errors.director && touched.director ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. Christopher Nolan"
                                    onBlur={validateHandler}
                                />
                                {touched.director && <span className={styles.errorMsg}>{errors.director}</span>}
                            </div>

                            {/* Place of born */}
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="writtenBy">
                                    Written by <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="writtenBy"
                                    {...formInputRegister("placeOfBorn")}
                                    type="text"
                                    className={`${styles.input}${errors.writtenBy && touched.writtenBy ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. Manel Santisteban"
                                    onBlur={validateHandler}
                                />
                                {touched.writtenBy && <span className={styles.errorMsg}>{errors.writtenBy}</span>}
                            </div>
                        </div>
                    </div>

                    {/* ─── Card 2: Media ─── */}
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Links</div>

                        <div className={styles.formGrid}>

                            {/* Image URL */}
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="posterUrl">
                                    Poster URL <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="posterUrl"
                                    {...formInputRegister("imageUrl")}
                                    type="url"
                                    className={`${styles.input}${errors.poster && touched.poster ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="https://…"
                                    onBlur={validateHandler}
                                />
                                {touched.poster && <span className={styles.errorMsg}>{errors.poster}</span>}

                                {/* Live image preview */}
                                <div className={styles.posterPreviewWrapper}>
                                    {showImagePreview ? (
                                        <img
                                            src={data.imageUrl}
                                            alt="Image preview"
                                            className={styles.posterPreviewImg}
                                            onBlur={validateHandler}
                                        // onError={() => setPosterError(true)}
                                        />
                                    ) : (
                                        <div className={styles.posterPreviewEmpty}>
                                            <span className={styles.posterPreviewIcon}>🎬</span>
                                            <span className={styles.posterPreviewText}>Poster preview</span>
                                        </div>
                                    )}
                                </div>
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
                            Reset
                        </button>
                        <button
                            type="submit"
                            className={styles.btnPrimary}
                        // disabled={loading}
                        >
                            Add an actor
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}