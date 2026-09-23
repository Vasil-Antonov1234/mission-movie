import { getInitials } from "../../utils/getInitials"
import styles from "./UserProfile.module.css"

export default function User() {
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
                            firstName lastName
                        </div>
                        <div className={styles.profileEmail}>email</div>
                        <div className={styles.profileBadges}>
                            <span className={styles.badge}>Member since createdAt</span>
                            {/* {user.isGoogleUser && (
                                <span className={`${styles.badge} ${styles.badgeGoogle}`}>
                                    Google account
                                </span>
                            )} */}
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
                                    <span className={styles.infoValue}>createdAt</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Sign-in method</span>
                                    {/* <span className={styles.infoValue}>
                                        {user.isGoogleUser ? "Google OAuth" : "Email & password"}
                                    </span> */}
                                </div>
                            </div>
                        </div>

                        {/* Danger zone */}
                        <div className={styles.dangerCard}>
                            <div className={styles.dangerTitle}>Danger Zone</div>
                            <p className={styles.dangerText}>
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <button className={styles.btnDanger}>
                                Delete account
                            </button>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    )
}