import { Link } from "react-router";
import styles from "./TopUsersCard.module.css";
import { getInitials } from "../../utils/getInitials";
import type { TopUsersProps } from "../../types/types";

export default function TopUsersCard(props: TopUsersProps) {
    return (
        <Link className={styles["link"]} to={`/user/${props.id}/public`}>
            <div className={styles["similar-item"]}>
                <div className={styles["similar-item-info"]}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarFallback}>
                            {getInitials("firstName", "lastName")}
                        </div>
                    </div>

                    <div>
                        <section>
                            <div className={styles["similar-item-name"]}>{props.firstName} {props.lastName}</div>
                            <div className={styles["similar-item-email"]}>{props.email}</div>
                        </section>
                        <div className={styles["score-container"]}>
                            <section className={styles["score-titles-wrapper"]}>
                                <div className={styles["similar-item-title"]}>added movies</div>
                                <div className={styles["similar-item-score"]}>{props.addedMovies}</div>
                            </section>
                            <section className={styles["score-titles-wrapper"]}>
                                <div className={styles["similar-item-title"]}>written reviews</div>
                                <div className={styles["similar-item-score"]}>{props.writtenReviews}</div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}