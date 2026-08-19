import { useContext, useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import type { ValidateValue } from "../../types/types";
import { validate } from "../../utils/validate";
import UserContext from "../../contexts/UserContext";
import { errorMessageHandler } from "../../utils/errorUtil";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

type Level = 0 | 1 | 2 | 3 | 4;

function getPassStrengthHandler(password: string) {
    let level: Level = 0;

    if (password.length > 8 && level < 4) {
        level = (level + 1) as Level;
    };
    if (/[A-Z]/.test(password) && level < 4) {
        level = (level + 1) as Level;
    };
    if (/[0-9]/.test(password) && level < 4) {
        level = (level + 1) as Level;
    };
    if (/[^A-Za-z0-9]/.test(password) && level < 4) {
        level = (level + 1) as Level;
    };

    const stages = {
        0: { label: "", key: "" },
        1: { label: "Weak", key: "weak" },
        2: { label: "Medium", key: "medium" },
        3: { label: "Good", key: "good" },
        4: { label: "Strong", key: "strong" }
    }

    type Result = { label: string, key: string }
    const result: Result = stages[level]

    return { level, result }
}

type PasswordStrengthHandlerProps = { password: string };

function PasswordStrengthHandler({ password }: PasswordStrengthHandlerProps) {
    const { level, result } = getPassStrengthHandler(password);

    return (
        <div className={styles["auth-strength"]}>
            <div className={styles["auth-strength-bars"]}>
                {[1, 2, 3, 4].map((x) => (
                    <div
                        key={x}
                        className={x >= level ? `${styles["auth-strength-bar"]} ${styles[`auth-strength-bar--${result.key}`]}` : styles["auth-strength-bar"]}
                    />
                ))}
            </div>
            {result.label && (
                <span className={`${styles["auth-strength-label"]} ${styles[`auth-strength-label--${result.key}`]}`}>
                    {result.label} password
                </span>
            )}
        </div>
    )
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { formInputRegister, data, setData } = useForm(initialValues)
    const { request } = useFetch();
    const [errors, setErrors] = useState<ValidateValue>({});
    const [touched, setTouched] = useState<ValidateValue>({});
    const { onLogin } = useContext(UserContext)

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
            }))
            return;
        };

        try {
            const result = await request("/users/register", "POST", {}, data);
            
            setErrors({});
            onLogin(result);
        } catch (error) {
            setData((state) => ({
                ...state,
                password: "",
                confirmPassword: ""
            }));

            alert(errorMessageHandler(error));
        };
    };

    return (
        <div className={styles["auth-wrapper"]}>
            {/* Background blurs */}
            <div className={`${styles["auth-bg-blur"]} ${styles["auth-bg-blur--gold"]}`} />
            <div className={`${styles["auth-bg-blur"]} ${styles["auth-bg-blur--dark"]}`} />

            <div className={styles["auth-card"]}>
                {/* Logo */}
                <Link to="/" className={styles["auth-logo"]}>
                    reel<span className={styles["auth-logo-accent"]}>ist</span>
                </Link>

                {/* Heading */}
                <div className={styles["auth-eyebrow"]}>Join Reelist</div>
                <h1 className={styles["auth-title"]}>Create your account</h1>
                <p className={styles["auth-subtitle"]}>
                    Free forever. Track every film you've ever watched.
                </p>

                {/* Social */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                    <button className={styles["auth-social-btn"]}>
                        <span className={styles["auth-social-icon"]}>G</span> Continue with Google
                    </button>
                    <button className={styles["auth-social-btn"]}>
                        <span className={styles["auth-social-icon"]}>⌘</span> Continue with Apple
                    </button>
                </div>

                {/* Divider */}
                <div className={styles["auth-divider"]}>
                    <div className={styles["auth-divider-line"]} />
                    <span className={styles["auth-divider-text"]}>or register with email</span>
                    <div className={styles["auth-divider-line"]} />
                </div>

                {/* Form */}
                <form className={styles["auth-form"]} action={actionHandler} noValidate>

                    {/* First / Last name */}
                    <div className={styles["auth-form-row"]}>
                        <div className={styles["auth-field"]}>
                            <label className={styles["auth-label"]} htmlFor="firstName">First name</label>
                            <input
                                {...formInputRegister("firstName")}
                                id="firstName"
                                type="text"
                                className={touched.firstName && errors.firstName ? `${styles["auth-input"]} ${styles["auth-input--error"]}` : styles["auth-input"]}
                                placeholder="Jane"
                                autoComplete="given-name"
                                onBlur={validateHandler}
                            />
                            {touched.firstName ? <p className={styles["auth-error-msg"]}>{errors.firstName}</p> : ""}
                        </div>
                        <div className={styles["auth-field"]}>
                            <label className={styles["auth-label"]} htmlFor="lastName">Last name</label>
                            <input
                                {...formInputRegister("lastName")}
                                id="lastName"
                                type="text"
                                className={touched.lastName && errors.lastName ? `${styles["auth-input"]} ${styles["auth-input--error"]}` : styles["auth-input"]}
                                placeholder="Doe"
                                autoComplete="family-name"
                                onBlur={validateHandler}
                            />
                            {touched.lastName ? <p className={styles["auth-error-msg"]}>{errors.lastName}</p> : ""}
                        </div>
                    </div>

                    {/* Email */}
                    <div className={styles["auth-field"]}>
                        <label className={styles["auth-label"]} htmlFor="email">Email</label>
                        <input
                            {...formInputRegister("email")}
                            id="email"
                            type="email"
                            className={touched.email && errors.email ? `${styles["auth-input"]} ${styles["auth-input--error"]}` : styles["auth-input"]}
                            placeholder="you@example.com"
                            autoComplete="email"
                            onBlur={validateHandler}
                        />
                        {touched.email ? <p className={styles["auth-error-msg"]}>{errors.email}</p> : ""}
                    </div>

                    {/* Password */}
                    <div className={styles["auth-field"]}>
                        <label className={styles["auth-label"]} htmlFor="password">Password</label>
                        <div className={styles["auth-input-wrapper"]}>
                            <input
                                {...formInputRegister("password")}
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
                                {...formInputRegister("confirmPassword")}
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

                    {/* Terms checkbox */}
                    <div className={styles["auth-field"]}>
                        <div className={styles["auth-checkbox-row"]}>
                            <input
                                id="agreeTerms"
                                name="agreeTerms"
                                type="checkbox"
                                className="auth-checkbox"
                            // checked={false}
                            />
                            <label htmlFor="agreeTerms" className={styles["auth-checkbox-label"]}>
                                I agree to the{" "}
                                <Link to="/terms" className="auth-terms-link" style={{ color: "#a09890" }}>
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="/privacy" className="auth-terms-link" style={{ color: "#a09890" }}>
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={styles["auth-submit-btn"]}
                        // disabled={}
                        style={{ marginTop: "4px" }}
                    >
                        Create account
                    </button>
                </form>

                {/* Switch to login */}
                <p className={styles["auth-switch"]} style={{ marginTop: "24px" }}>
                    Already have an account?{" "}
                    <Link to="/login" className={styles["auth-switch-link"]}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};