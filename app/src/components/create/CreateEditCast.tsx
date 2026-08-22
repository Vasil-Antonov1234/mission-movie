import { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import styles from "./CreateEditMovie.module.css";
import type { ValidateValue } from "../../types/types";
import { validate } from "../../utils/validate";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { errorMessageHandler } from "../../utils/errorUtil";

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
    const { request } = useFetch();
    const { user, onLogout } = useContext(UserContext);
    const navigate = useNavigate();

    async function actionHandler() {
        const fieldErrors = validate(data);
        setErrors(fieldErrors);
        setTouched(fieldErrors);

        if (Object.keys(fieldErrors).length > 0) {
            return;
        };

        try {
                      
            await request("/casts/create", "POST", { accessToken: user.accessToken }, data);

            setErrors({});

            navigate("/");
        } catch (error) {
            const errorMessage = errorMessageHandler(error);

            if (errorMessage === "Invalid token") {
                onLogout("/login");
            };
        }
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
                                <label className={styles.label} htmlFor="firstName">
                                    First name <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="firstName"
                                    {...formInputRegister("firstName")}
                                    type="text"
                                    className={`${styles.input}${errors.firstName && touched.firstName ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. John"
                                    autoComplete="off"
                                    onBlur={validateHandler}
                                />
                                {touched.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                            </div>

                            {/* Last name */}
                            <div className={`${styles.field} ${styles.colSpan2}`}>
                                <label className={styles.label} htmlFor="lastName">
                                    Last name <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="lastName"
                                    {...formInputRegister("lastName")}
                                    type="text"
                                    className={`${styles.input}${errors.lastName && touched.lastName ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. A Brand New Day starts now."
                                    autoComplete="off"
                                    onBlur={validateHandler}
                                />
                                {touched.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                            </div>

                            {/* Birthday */}
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="bornDate">
                                    Birthday <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="bornDate"
                                    {...formInputRegister("bornDate")}
                                    type="text"
                                    className={`${styles.input}${errors.bornDate && touched.bornDate ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. November 28, 1982"
                                    onBlur={validateHandler}
                                />
                                {touched.bornDate && <span className={styles.errorMsg}>{errors.bornDate}</span>}
                            </div>

                            {/* Place of born */}
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="placeOfBorn">
                                    Place of born <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="placeOfBorn"
                                    {...formInputRegister("placeOfBorn")}
                                    type="text"
                                    className={`${styles.input}${errors.placeOfBorn && touched.placeOfBorn ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="e.g. Los Angeles, USA"
                                    onBlur={validateHandler}
                                />
                                {touched.placeOfBorn && <span className={styles.errorMsg}>{errors.placeOfBorn}</span>}
                            </div>
                        </div>
                    </div>

                    {/* ─── Card 2: Media ─── */}
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Links</div>

                        <div className={styles.formGrid}>

                            {/* Image URL */}
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="imageUrl">
                                    Image <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="imageUrl"
                                    {...formInputRegister("imageUrl")}
                                    type="url"
                                    className={`${styles.input}${errors.imageUrl && touched.imageUrl ? ` ${styles["input--error"]}` : ""}`}
                                    placeholder="https://…"
                                    onBlur={validateHandler}
                                />
                                {touched.imageUrl && <span className={styles.errorMsg}>{errors.imageUrl}</span>}

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