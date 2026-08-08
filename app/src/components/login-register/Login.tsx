import { Link } from "react-router";
import styles from "./Auth.module.css";
import { Activity, useState } from "react";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { useFormStatus } from "react-dom";

const initialValues = {
    email: "",
    password: ""
};


function Loading() {

    const { pending } = useFormStatus();


    return (
        <Activity
            mode={pending ? "visible" : "hidden"}
            children={<div className={styles["loading"]}>Loading
                <span className={styles["loading-dot1"]}>.</span>
                <span className={styles["loading-dot2"]}>.</span>
                <span className={styles["loading-dot3"]}>.</span>
            </div>}
        />
    )
};

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { formInputRegister, data, setData } = useForm(initialValues)
    const { request } = useFetch();

    async function actionHandler() {

        try {
            const result = await request("/users/login", "POST", data);

            setData(initialValues);
            console.log(result);
        } catch (error) {
            setData((state) => ({ ...state, password: "" }));
            console.log(error)
        }
    }

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
                <form className={styles["auth-form"]} action={actionHandler} noValidate>

                    {<Loading />}


                    {/* Email */}
                    <div className={styles["auth-field"]}>
                        <label className={styles["auth-label"]} htmlFor="email">Email</label>
                        <div className={styles["auth-input-wrapper"]}>
                            <input
                                {...formInputRegister("email")}
                                id="email"
                                type="email"
                                className={styles["auth-input"]}
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className={styles["auth-field"]}>
                        <div className={styles["auth-field-header"]}>
                            <label className={styles["auth-label"]} htmlFor="password">Password</label>
                            <Link to="/forgot-password" className={styles["auth-forgot-link"]}>Forgot password?</Link>
                        </div>
                        <div className={styles["auth-input-wrapper"]}>
                            <input
                                {...formInputRegister("password")}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={`${styles["auth-input"]} ${styles["auth-input--has-icon"]}`}
                                placeholder="••••••••"
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