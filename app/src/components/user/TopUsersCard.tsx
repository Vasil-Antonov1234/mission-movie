import { Link } from "react-router";
import styles from "./TopUsersCard.module.css";
import { getInitials } from "../../utils/getInitials";

export default function TopUsersCard() {
    return (
        <Link className={styles["link"]} to={`/user/UserId/details`}>
            <div className={styles["similar-item"]}>
                <div className={styles["similar-item-info"]}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarFallback}>
                            {getInitials("firstName", "lastName")}
                        </div>
                    </div>

                    <div>
                        <section>
                            <div className={styles["similar-item-name"]}>firstName lastName</div>
                            <div className={styles["similar-item-email"]}>email</div>
                        </section>
                        <div className={styles["score-container"]}>
                            <section className={styles["score-titles-wrapper"]}>
                                <div className={styles["similar-item-title"]}>added movies</div>
                                <div className={styles["similar-item-score"]}>14</div>
                            </section>
                            <section className={styles["score-titles-wrapper"]}>
                                <div className={styles["similar-item-title"]}>written reviews</div>
                                <div className={styles["similar-item-score"]}>19</div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}