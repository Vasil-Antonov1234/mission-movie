import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./AdminPanel.module.css"
import UserContext from "../../contexts/UserContext";
import type { User } from "../../types/types";
import { Link } from "react-router";

export default function AdminPanel() {
    const { user } = useContext(UserContext);
    const { data: users } = useFetch<User[]>("/users/get-all", [], { accessToken: user.accessToken });

    console.log(users);

    return (
        <div className={`${styles.sidebarCard} ${styles.users}`}>
            <div className={styles.sidebarCardTitle}>Admin panel</div>
            <div className={styles.dangerTitle}>Users</div>
            <div className={styles.infoList}>
                {users?.map((x) =>
                    <p className={styles["favourites-wrapper"]} key={x.id}>
                        <Link className={styles["users-title"]} to={`/users/${x.id}`}>{x.email}</Link>
                    </p>)}
            </div>
        </div>
    );
}