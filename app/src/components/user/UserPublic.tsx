import { Link, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { convertDate } from "../../utils/convertDate";
import { getInitials } from "../../utils/getInitials";
import styles from "./UserProfile.module.css";
import type { Movie, User } from "../../types/types";

const initialState: User = {
    id: 0,
    createdAt: "",
    firstName: "",
    lastName: "",
    email: ""
};

type AddetReview = {
    id: string,
    createdAt: string,
    cinematographyScore: string,
    directorScore: string,
    performanceScore: string,
    screenplayScore: string
    movie: {
        title: string
    }
};

export default function UserPublic() {
    const userId = useParams().userId;
    const { data: user } = useFetch(`/users/profile/${userId}/public`, initialState);
    const { data: addedMovies } = useFetch<Movie[]>(`/users/added/movies/${userId}`, []);
    const { data: writtenReviews } = useFetch<AddetReview[]>(`/users/added/reviews/${userId}`, []);

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
                            {getInitials(user?.firstName, user?.lastName)}
                        </div>
                        <div className={styles.profileEmail}>{user?.email}</div>
                    </div>

                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>
                            {user?.firstName} {user?.lastName}
                        </div>
                        <div className={styles.profileBadges}>
                            <span className={styles.badge}>Member since {convertDate(user?.createdAt)}</span>
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
                                        {addedMovies?.map((x) =>
                                            <p className={styles["favourites-wrapper"]} key={x.id}>
                                                <Link className={styles["watchlist-title"]} to={`/movies/${x.id}/details`}>{x.title}</Link>
                                            </p>)}
                                    </div>
                                </div>
                            </section>

                            {/* Written reviews */}
                            <section className={`${styles.sidebarCard} ${styles["additional-info-card"]}`}>
                                <div className={styles.sidebarCardTitle}>Written reviews</div>
                                <div className={styles.infoList}>
                                    <div className={styles.infoItem}>
                                        {writtenReviews?.map((x) =>
                                            <p className={styles["favourites-wrapper"]} key={x.id}>
                                                <Link className={styles["watchlist-title"]} to={`/review/${x.id}`}>{x.movie.title}</Link>
                                            </p>)}
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