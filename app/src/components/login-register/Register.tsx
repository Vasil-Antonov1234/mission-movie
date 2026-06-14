import { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
                <form className={styles["auth-form"]} noValidate>

                    {/* First / Last name */}
                    <div className={styles["auth-form-row"]}>
                        <div className={styles["auth-field"]}>
                            <label className={styles["auth-label"]} htmlFor="firstName">First name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className={styles["auth-input"]}
                                placeholder="Jane"
                                // value=""
                                autoComplete="given-name"
                            />
                        </div>
                        <div className={styles["auth-field"]}>
                            <label className={styles["auth-label"]} htmlFor="lastName">Last name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className={styles["auth-input"]}
                                placeholder="Doe"
                                // value=""
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className={styles["auth-field"]}>
                        <label className={styles["auth-label"]} htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={styles["auth-input"]}
                            placeholder="you@example.com"
                            // value=""
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}
                    <div className={styles["auth-field"]}>
                        <label className={styles["auth-label"]} htmlFor="password">Password</label>
                        <div className={styles["auth-input-wrapper"]}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className={`${styles["auth-input"]} ${styles["auth-input--has-icon"]}`}
                                placeholder="Min. 8 characters"
                                // value=""
                                autoComplete="new-password"
                            />
                            <span
                                className="auth-input-icon"
                                onClick={() => setShowPassword((state) => !state)}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </span>
                        </div>
                    </div>

                    {/* Confirm password */}
                    <div className={styles["auth-field"]}>
                        <label className={styles["auth-label"]} htmlFor="confirmPassword">Confirm password</label>
                        <div className="auth-input-wrapper">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                className={`${styles["auth-input"]} ${styles["auth-input--has-icon"]}`}
                                placeholder="Repeat your password"
                                // value=""
                                autoComplete="new-password"
                            />
                            <span
                                className="auth-input-icon"
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