import styles from "./AdminPanel.module.css"

export default function AdminPanel() {
    return (
        <div className={`${styles.sidebarCard} ${styles.users}`}>
            <div className={styles.sidebarCardTitle}>Admin panel</div>
            <div className={styles.infoList}>
                {/* {favoriteMovies.map((x) =>
                                    <p className={styles["favourites-wrapper"]} key={x.id}>
                                        <Link className={styles["users-title"]} to={`/movies/${x.movie?.id}/details`}>{x.movie?.title}</Link>
                                        <span className={styles.remove} onClick={() => removeFavouriteMovie(x.movie?.id)}>remove</span>
                                    </p>)} */}
            </div>
        </div>
    );
}