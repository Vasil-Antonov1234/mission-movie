import styles from "./Auth.module.css";

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

export default function PasswordStrengthHandler({ password }: PasswordStrengthHandlerProps) {
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