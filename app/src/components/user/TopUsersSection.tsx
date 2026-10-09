import useFetch from "../../hooks/useFetch";
import type { TopUsersProps } from "../../types/types";
import TopUsersCard from "./TopUsersCard";
import styles from "./TopUsersSection.module.css";

export default function TopUsersSection() {
    const { data } = useFetch<TopUsersProps[]>("/users/top/users", []);

    return (
        <section className={styles["top-users-section"]}>
            <div className={styles["section-header"]}>
                <div>
                    <div className={`${styles["section-label"]} ${styles["section-label--spaced"]}`}>People</div>
                    <h2 className={styles["section-heading"]}>Top users</h2>
                </div>
            </div>
            <div className={styles["top-users-container"]}>
                {data?.map((x) => <TopUsersCard
                    key={x.id}
                    id={x.id}
                    firstName={x.firstName}
                    lastName={x.lastName}
                    email={x.email}
                    addedMovies={x.addedMovies}
                    writtenReviews={x.writtenReviews}
                    totalCount={x.totalCount}
                    avatarUrl={x.avatarUrl}
                />)}
            </div>
        </section>
    );
}