import { useState } from "react";
import styles from "./Auth.module.css";
import type { ValidateErrors } from "../../types/types";
import useForm from "../../hooks/useForm";
import { validate } from "../../utils/validate";
import PasswordStrengthHandler from "./PasswordStrengthHandler";
import { Link, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { errorMessageHandler } from "../../utils/errorUtil";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

const initialState = {
    password: "",
    confirmPassword: ""
};

export default function ResetPassword() {
    const { data, setData, registerTextInput } = useForm(initialState);
    const [errors, setErrors] = useState<ValidateErrors>({});
    const [touched, setTouched] = useState<ValidateErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { request } = useFetch();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const token = searchParams.get("token");

    function validateHandler(event: React.BaseSyntheticEvent) {
        setTouched((state) => ({
            ...state,
            [event.target.name]: true
        }));

        const fieldErrors = validate(data);
        setErrors(fieldErrors);
    };

    async function actionHandler() {
        const fieldErrors = validate(data);
        setErrors(fieldErrors);
        setTouched(fieldErrors);

        if (Object.keys(fieldErrors).length > 0) {
            setData((state) => ({
                ...state,
                password: "",
                confirmPassword: ""
            }));
            return;
        };

        try {
            const payload = {
                password: data.password,
                token
            };

            const result = await request("/users/reset-password", "POST", {}, payload);

            setErrors({});

            toast.info(result.message);

            navigate("/login");
        } catch (error) {
            setData((state) => ({
                ...state,
                password: "",
                confirmPassword: ""
            }));

            errorMessageHandler(error);
        };
    };

    return (
        <div className={styles["auth-wrapper"]}>
            <div className={styles["auth-card"]}>
                <div className={styles["auth-eyebrow"]}>Password management</div>
                <h1 className={styles["auth-title"]}>Reset Password</h1>
                <p className={styles["auth-subtitle"]}>
                    Fill in password, and confirm password fields then click submit to reset your password.
                </p>

                <form className={styles["auth-form"]} action={actionHandler}>
                    <div className={styles["auth-field"]}>

                        {/* Password */}
                        <div className={styles["auth-field"]}>
                            <label className={styles["auth-label"]} htmlFor="password">Password</label>
                            <div className={styles["auth-input-wrapper"]}>
                                <input
                                    {...registerTextInput("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`${styles["auth-input"]} ${styles["auth-input--has-icon"]} ${touched.password && errors.password ? styles["auth-input--error"] : ""}`}
                                    placeholder="Min. 8 characters"
                                    autoComplete="new-password"
                                    onBlur={validateHandler}
                                />
                                {touched.password ? <p className={styles["auth-error-msg"]}>{errors.password}</p> : ""}
                                <span
                                    className={styles["auth-input-icon"]}
                                    onClick={() => setShowPassword((state) => !state)}
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </span>
                            </div>
                            <PasswordStrengthHandler password={data.password} />
                        </div>

                        {/* Confirm password */}
                        <div className={styles["auth-field"]}>
                            <label className={styles["auth-label"]} htmlFor="confirmPassword">Confirm password</label>
                            <div className={styles["auth-input-wrapper"]}>
                                <input
                                    {...registerTextInput("confirmPassword")}
                                    id="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    className={`${styles["auth-input"]} ${styles["auth-input--has-icon"]} ${touched.confirmPassword && errors.confirmPassword ? styles["auth-input--error"] : ""}`}
                                    placeholder="Repeat your password"
                                    autoComplete="new-password"
                                    onBlur={validateHandler}
                                />
                                {touched.confirmPassword ? <p className={styles["auth-error-msg"]}>{errors.confirmPassword}</p> : ""}
                                <span
                                    className={styles["auth-input-icon"]}
                                    onClick={() => setShowConfirm((state) => !state)}
                                >
                                    {showConfirm ? "🙈" : "👁"}
                                </span>
                            </div>
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

                {/* Back to login */}
                <p className={styles["auth-switch"]} style={{ marginTop: "24px" }}>
                    Go to{" "}
                    <Link to="/login" className={styles["auth-switch-link"]}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}