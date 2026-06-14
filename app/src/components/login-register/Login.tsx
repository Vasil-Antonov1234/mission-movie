import { Link } from "react-router";
import styles from "./Auth.module.css";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles["auth-wrapper"]}>
            {/* Background blurs */}
            <div className={`${styles["auth-bg-blur"]} ${styles["auth-bg-blur--gold"]}`} />
            <div className={`${styles["auth-bg-blur"]} ${styles["auth-bg-blur--dark"]}`} />

            <div className="auth-card">
                {/* Logo */}
                <Link to="/" className={styles["auth-logo"]}>
                    Mission<span className={styles["auth-logo-accent"]}>movie</span>
                </Link>

                {/* Heading */}
                <div className={styles["auth-eyebrow"]}>Welcome back</div>
                <h1 className={styles["auth-title"]}>Sign in to your account</h1>
                <p className={styles["auth-subtitle"]}>
                    Track films, write reviews, and connect with fellow cinephiles.
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
                    <span className={styles["auth-divider-text"]}>or sign in with email</span>
                    <div className={styles["auth-divider-line"]} />
                </div>

                {/* Form */}
                <form className={styles["auth-form"]} noValidate>

                    {/* Email */}
                    <div className={styles["auth-field"]}>
                        <label className={styles["auth-label"]} htmlFor="email">Email</label>
                        <div className={styles["auth-input-wrapper"]}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={styles["auth-input"]}
                                placeholder="you@example.com"
                                value=""
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className={styles["auth-field"]}>
                        <div className={styles["auth-field-header"]}>
                            <label className={styles["auth-label"]} htmlFor="password">Password</label>
                            <Link to="/forgot-password" className="auth-forgot-link">Forgot password?</Link>
                        </div>
                        <div className={styles["auth-input-wrapper"]}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className={`${styles["auth-input"]} ${styles["auth-input--has-icon"]}`}
                                placeholder="••••••••"
                                value=""
                                autoComplete="current-password"
                            />
                            <span
                                className={styles["auth-input-icon"]}
                                onClick={() => setShowPassword((state) => !state)}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </span>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={styles["auth-submit-btn"]}
                        style={{ marginTop: "4px" }}
                    >
                        Sign in
                    </button>
                </form>

                {/* Switch to register */}
                <p className={styles["auth-switch"]} style={{ marginTop: "24px" }}>
                    Don't have an account?{" "}
                    <Link to="/register" className={styles["auth-switch-link"]}>Create one free</Link>
                </p>
            </div>
        </div>
    );
}