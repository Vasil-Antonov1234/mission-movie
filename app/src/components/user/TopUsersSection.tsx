import styles from "./TopUsersSection.module.css";

export default function TopUsersSection() {
    return (
        <section className={styles["reviews-section"]}>
            <div className={styles["section-header"]}>
                <div>
                    <div className={`${styles["section-label"]} ${styles["section-label--spaced"]}`}>People</div>
                    <h2 className={styles["section-heading"]}>Top users</h2>
                </div>
            </div>
            <div className={styles["reviews-container"]}>

            </div>
        </section>
    );
}