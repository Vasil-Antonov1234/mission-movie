import { useNavigate, useParams } from "react-router"
import useFetch from "../../hooks/useFetch"
import { getInitials } from "../../utils/getInitials"
import styles from "./UserProfile.module.css"
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import type { User } from "../../types/types";
import { convertDate } from "../../utils/convertDate";
import { toast } from "react-toastify";
import { errorMessageHandler } from "../../utils/errorUtil";

const initialState: User = {
    id: 0,
    accessToken: "",
    createdAt: "",
    email: "",
    firstName: "",
    lastName: "",
    isGoogleUser: false,
    role: "USER"
};

const initialMovieCount = { count: "0" };


export default function UserDetails() {
    const userId = useParams().userId;
    const { user } = useContext(UserContext);
    const { data, request } = useFetch(`/users/${userId}`, initialState, { accessToken: user.accessToken });
    const { data: addedFilmsCount } = useFetch(`/users/added-films-count/${userId}`, initialMovieCount);
    const { data: writtenReviews } = useFetch(`/reviews/${userId}/count`, [], { accessToken: user.accessToken });

    const navigate = useNavigate();

    async function deleteProfileHandler() {

        const deleteProfile = confirm(`Are you sure you want to delete the frofile associated with email: ${data?.email}? This action is irreversible!`);

        if (deleteProfile) {

            try {
                await request(`/users/${userId}/admin-delete`, "DELETE", { accessToken: user.accessToken })
                toast.dark(`Profile: ${data?.email} has been deleted!`);

                navigate("/users/profile");
            } catch (error) {
                errorMessageHandler(error);
            };
        };

    };

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
                            {getInitials(data?.firstName, data?.lastName)}
                        </div>
                    </div>

                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>
                            {`${data?.firstName} ${data?.lastName}`}
                        </div>
                        <div className={styles.profileEmail}>{data?.email}</div>
                        <div className={styles.profileBadges}>
                            <span className={styles.badge}>Member since {convertDate(data?.createdAt)}</span>
                            {data?.isGoogleUser && (
                                <span className={`${styles.badge} ${styles.badgeGoogle}`}>
                                    Google account
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ─── Body ─── */}
                <div className={styles.body}>

                    {/* ── MAIN COLUMN ── */}
                    <div>

                        {/* ── Profile info card ── */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <div className={styles.cardEyebrow}>Personal</div>
                                    <div className={styles.cardTitle}>Profile Information</div>
                                </div>
                            </div>

                            <div className={styles.formGrid}>

                                {/* First name */}
                                <div className={styles.field}>
                                    <div className={styles.label} >First name</div>
                                    <div className={styles.names}>{data?.firstName}</div>
                                </div>

                                {/* Last name */}
                                <div className={styles.field}>
                                    <div className={styles.label} >Last name</div>
                                    <div className={styles.names}>{data?.lastName}</div>
                                </div>

                                {/* Email */}
                                <div className={styles.field}>
                                    <div className={styles.label} >Email</div>
                                    <div className={styles.names}>{data?.email}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.statsRow}>
                            <div className={styles.statCard}>
                                <div className={styles.statValue}>{addedFilmsCount?.count}</div>
                                <div className={styles.statLabel}>Films added</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statValue}>{writtenReviews}</div>
                                <div className={styles.statLabel}>Written reviews</div>
                            </div>
                        </div>
                    </div>


                    {/* ── SIDEBAR ── */}
                    <aside>

                        {/* Account info */}
                        <div className={styles.sidebarCard}>
                            <div className={styles.sidebarCardTitle}>Account Details</div>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Member since</span>
                                    <span className={styles.infoValue}>{convertDate(data?.createdAt)}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Sign-in method</span>
                                    <span className={styles.infoValue}>
                                        {data?.isGoogleUser ? "Google OAuth" : "Email & password"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Danger zone */}
                        <div className={styles.dangerCard}>
                            <div className={styles.dangerTitle}>Danger Zone</div>
                            <p className={styles.dangerText}>
                                {`Permanently delete the account with email: ${data?.email} and all associated data. This action cannot be undone.`}
                            </p>
                            <button className={styles.btnDanger} onClick={deleteProfileHandler}>
                                Delete account
                            </button>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    )
}