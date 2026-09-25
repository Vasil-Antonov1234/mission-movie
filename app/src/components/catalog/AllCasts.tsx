import CastCardSmall from "../cast/CastCardSmall";
import styles from "./AllCasts.module.css"

export default function AllCasts() {
    return (
        <section className={styles["trending-section"]}>
            <div>
                <h1 className={styles["section-heading-title"]}>Cast managment</h1>
            </div>
            <section className={styles["trending-wrapper"]}>
                <div className={styles["trending-container"]}>
                   <CastCardSmall />
                   <CastCardSmall />
                   <CastCardSmall />
                </div>
            </section>
            <section className={styles["trending-wrapper"]}>
                <h2 className={styles["no-cast"]}>Nothing here yet</h2>
            </section>
        </section>
    );
}