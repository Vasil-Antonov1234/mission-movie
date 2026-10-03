import { useState } from "react"
import styles from "./Auth.module.css";
import type { ValidateErrors } from "../../types/types";
import { validate } from "../../utils/validate";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<ValidateErrors>({});
    const [touched, setTouched] = useState<ValidateErrors>({});

    function changeHandler(event: React.BaseSyntheticEvent) {
        setEmail(event.target.value);
    };

    function validateHandler(event: React.BaseSyntheticEvent) {
        setTouched((state) => ({
            ...state,
            [event.target.name]: true
        }));

        const fieldErrors = validate({ email });
        setErrors(fieldErrors);
    };

    return (
        <div className={styles["auth-wrapper"]}>
            <div className={styles["auth-card"]}>
                <div className={styles["auth-eyebrow"]}>Password management</div>
                <h1 className={styles["auth-title"]}>Reset Password</h1>
                <p className={styles["auth-subtitle"]}>
                    Please enter your email address, and a password reset link will be sent to it.
                </p>

                <form className={styles["auth-form"]}>
                    <div className={styles["auth-field"]}>

                        {/* Email */}
                        <label className={styles["auth-label"]} htmlFor="email">Your Email</label>
                        <div className={styles["auth-input-wrapper"]}>
                            <input
                                name="email"
                                id="email"
                                value={email}
                                type="email"
                                className={touched.email && errors.email ? `${styles["auth-input"]} ${styles["auth-input--error"]}` : styles["auth-input"]}
                                onChange={changeHandler}
                                placeholder="you@example.com"
                                autoComplete="email"
                                onBlur={validateHandler}
                            />
                            {touched.email ? <p className={styles["auth-error-msg"]}>{errors.email}</p> : ""}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={styles["auth-submit-btn"]}
                        style={{ marginTop: "4px" }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}