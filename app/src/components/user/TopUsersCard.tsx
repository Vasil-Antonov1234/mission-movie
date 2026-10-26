import { Link } from "react-router";
import styles from "./TopUsersCard.module.css";
import theme from "../Theme.module.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { getInitials } from "../../utils/getInitials";
import type { TopUsersProps } from "../../types/types";
import { Activity } from "react";

export default function TopUsersCard(props: TopUsersProps) {
    const { isDarkTheme } = useContext(UserContext);
    const avatar = props.avatarUrl ? props.avatarUrl : undefined;

    return (
        <Link className={styles["link"]} to={`/user/${props.id}/public`}>
            <div className={`${styles["similar-item"]} ${!isDarkTheme ? theme["top-user-card"] : ""}`}>
                <div className={styles["similar-item-info"]}>
                    <Activity mode={avatar ? "hidden" : "visible"}>
                        <div className={styles.avatarWrapper}>
                            <div className={styles.avatarFallback}>
                                {getInitials(props.firstName, props.lastName)}
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
                            <div className={`${styles["similar-item-name"]} ${!isDarkTheme ? theme["text"] : ""}`}>{props.firstName} {props.lastName}</div>
                            <div className={styles["similar-item-email"]}>{props.email}</div>
                        </section>
                        <div className={styles["score-container"]}>
                            <section className={styles["score-titles-wrapper"]}>
                                <div className={`${styles["similar-item-title"]} ${!isDarkTheme ? theme["text-gray"] : ""}`}>added movies</div>
                                <div className={styles["similar-item-score"]}>{props.addedMovies}</div>
                            </section>
                            <section className={styles["score-titles-wrapper"]}>
                                <div className={`${styles["similar-item-title"]} ${!isDarkTheme ? theme["text-gray"] : ""}`}>written reviews</div>
                                <div className={styles["similar-item-score"]}>{props.writtenReviews}</div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}