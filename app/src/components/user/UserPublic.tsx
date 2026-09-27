import { convertDate } from "../../utils/convertDate";
import { getInitials } from "../../utils/getInitials";
import styles from "./UserProfile.module.css";

export default function UserPublic() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ─── Page header ─── */}
                <div className={styles.pageEyebrow}>Account</div>
                <h1 className={styles.pageTitle}>Profile</h1>

                {/* ─── Profile summary card ─── */}
                <div className={styles.profileCard}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarFallback}>
                            {getInitials("firstName", "lastName")}
                        </div>
                    </div>

                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>
                            {"firstName"} {"lastName"}
                        </div>
                        <div className={styles.profileBadges}>
                            <span className={styles.badge}>Member since {"createdAd"}</span>
                        </div>
                    </div>
                </div>

                {/* ─── Body ─── */}
                <div className={styles.body}>

                    {/* ── MAIN COLUMN ── */}
                    <div>

                        {/* Additional info */}
                        <section>

                            {/* Added movies */}
                            <section className={`${styles.sidebarCard} ${styles["additional-info-card"]}`}>
                                <div className={styles.sidebarCardTitle}>Added movies</div>
                                <div className={styles.infoList}>
                                    <div className={styles.infoItem}>
                                        {/* {writtenReviews?.map((x) =>
                                            <p className={styles["favourites-wrapper"]} key={x.id}>
                                                <Link className={styles["watchlist-title"]} to={`/review/${x.id}`}>{x.movie.title}</Link>
                                            </p>)} */}
                                    </div>
                                </div>
                            </section>

                            {/* Written reviews */}
                            <section className={`${styles.sidebarCard} ${styles["additional-info-card"]}`}>
                                <div className={styles.sidebarCardTitle}>Written reviews</div>
                                <div className={styles.infoList}>
                                    <div className={styles.infoItem}>
                                        {/* {writtenReviews?.map((x) =>
                                            <p className={styles["favourites-wrapper"]} key={x.id}>
                                                <Link className={styles["watchlist-title"]} to={`/review/${x.id}`}>{x.movie.title}</Link>
                                            </p>)} */}
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}