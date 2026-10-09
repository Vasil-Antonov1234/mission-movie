import { Link } from "react-router";
import styles from "./TopUsersCard.module.css";
import { getInitials } from "../../utils/getInitials";
import type { TopUsersProps } from "../../types/types";
import { Activity } from "react";

export default function TopUsersCard(props: TopUsersProps) {
    const avatar = props.avatarUrl ? props.avatarUrl : "";

    return (
        <Link className={styles["link"]} to={`/user/${props.id}/public`}>
            <div className={styles["similar-item"]}>
                <div className={styles["similar-item-info"]}>
                    <Activity mode={avatar ? "hidden" : "visible"}>
                        <div className={styles.avatarWrapper}>
                            <div className={styles.avatarFallback}>
                                {getInitials("firstName", "lastName")}
                            </div>
                        </div>
                    </Activity>
                    <Activity mode={avatar ? "visible" : "hidden"}>
                        <div className={styles.avatarWrapper}>
                            <div className={styles.avatarFallback}>
                                <img src={avatar} className={styles["avatar"]}></img>
                            </div>
                        </div>
                    </Activity>

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