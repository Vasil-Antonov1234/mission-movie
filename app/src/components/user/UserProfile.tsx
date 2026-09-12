import { useState, ChangeEvent, FormEvent, useContext, Activity } from "react";
import styles from "./UserProfile.module.css";
import UserContext from "../../contexts/UserContext";
import { convertDate } from "../../utils/convertDate";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import type { ValidateValue } from "../../types/types";
import { validate } from "../../utils/validate";

// ─── TYPES ────────────────────────────────────────────────────────────────────

// type User = {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     isGoogleUser: boolean;
//     createdAt: string;
//     moviesAdded: number;
//     reviews: number;
//     favourites: number;
// }

type ProfileForm = {
    firstName?: string;
    lastName?: string;
    email?: string;
}

type PasswordForm = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

type ProfileErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
}

type PasswordErrors = {
    currentPassword?: string;
    password?: string;
    confirmPassword?: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getInitials(firstName: string | undefined, lastName: string | undefined): string {
    return `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase();
}

function validateProfile(form: ProfileForm): ProfileErrors {
    const errors: ProfileErrors = {};
    if (form.firstName && !form.firstName.trim()) errors.firstName = "First name is required.";
    if (form.lastName && !form.lastName.trim()) errors.lastName = "Last name is required.";
    if (form.email && !form.email.trim()) {
        errors.email = "Email is required.";
    } else if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Please enter a valid email.";
    }
    return errors;
}

function validatePassword(form: PasswordForm): PasswordErrors {
    const errors: PasswordErrors = {};
    if (!form.currentPassword) errors.currentPassword = "Current password is required.";
    if (!form.newPassword) {
        errors.password = "New password is required.";
    } else if (form.newPassword.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }
    if (!form.confirmPassword) {
        errors.confirmPassword = "Please confirm your new password.";
    } else if (form.newPassword !== form.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
}

const changePasswordInitialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: ""
}


// ─── COMPONENT ────────────────────────────────────────────────────────────────

const initialMovieCount = { count: "0" };

export default function UserProfile() {
    const { user: user } = useContext(UserContext);
    const { data: addedFilmsCount } = useFetch(`/users/added-films-count/${user.id}`, initialMovieCount);

    const { data, formInputRegister, setData } = useForm(changePasswordInitialValues);
    const [errors, setErrors] = useState<ValidateValue>({});
    const [touched, setTouched] = useState<ValidateValue>({});

    function validateHandler(event: React.BaseSyntheticEvent) {
        setTouched((state) => ({
            ...state,
            [event.target.name]: true
        }));

        const fieldErrors = validate(data);
        setErrors(fieldErrors);
    }

    // ── Profile edit state ──
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState<ProfileForm>({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
    const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState(false);

    // ── Password change state ──
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // ── Handlers: profile ──

    const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
        if (profileErrors[name as keyof ProfileErrors]) {
            setProfileErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errors = validateProfile(profileForm);
        if (Object.keys(errors).length > 0) { setProfileErrors(errors); return; }
        setProfileLoading(true);

        // TODO real API call:

        await new Promise((r) => setTimeout(r, 1000));
        setProfileLoading(false);
        setProfileSuccess(true);
        setIsEditingProfile(false);
        setTimeout(() => setProfileSuccess(false), 4000);
    };

    const handleProfileCancel = () => {
        setProfileForm({ firstName: user.firstName, lastName: user.lastName, email: user.email ?? "" });
        setProfileErrors({});
        setIsEditingProfile(false);
    };

    // ── Handlers: password ──

    // const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setPasswordForm((prev) => ({ ...prev, [name]: value }));
    //     if (passwordErrors[name as keyof PasswordErrors]) {
    //         setPasswordErrors((prev) => ({ ...prev, [name]: undefined }));
    //     }
    // };

    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errors = validatePassword(passwordForm);
        if (Object.keys(errors).length > 0) { setPasswordErrors(errors); return; }
        setPasswordLoading(true);

        // TODO: API call:

        await new Promise((r) => setTimeout(r, 1000));
        setPasswordLoading(false);
        setPasswordSuccess(true);
        setIsEditingPassword(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setPasswordSuccess(false), 4000);
    };

    const handlePasswordCancel = () => {
        // setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        // setPasswordErrors({});
        setIsEditingPassword(false);
        setData(changePasswordInitialValues);
        setErrors({});
        setTouched({});
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ─── Page header ─── */}
                <div className={styles.pageEyebrow}>Account</div>
                <h1 className={styles.pageTitle}>Your Profile</h1>

                {/* ─── Profile summary card ─── */}
                <div className={styles.profileCard}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarFallback}>
                            {getInitials(user.firstName, user.lastName)}
                        </div>
                    </div>

                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className={styles.profileEmail}>{user.email}</div>
                        <div className={styles.profileBadges}>
                            <span className={styles.badge}>Member since {convertDate(user.createdAt)}</span>
                            {user.isGoogleUser && (
                                <span className={`${styles.badge} ${styles.badgeGoogle}`}>
                                    Google account
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ─── Stats ─── */}
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{addedFilmsCount?.count}</div>
                        <div className={styles.statLabel}>Films added</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>3</div>
                        <div className={styles.statLabel}>Reviews</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>9</div>
                        <div className={styles.statLabel}>Favourites</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>0</div>
                        <div className={styles.statLabel}>Watch list</div>
                    </div>
                </div>

                {/* ─── Body ─── */}
                <div className={styles.body}>

                    {/* ── MAIN COLUMN ── */}
                    <div>

                        {/* Success banners */}
                        {profileSuccess && (
                            <div className={styles.successBanner}>
                                ✓ Profile updated successfully.
                            </div>
                        )}
                        {passwordSuccess && (
                            <div className={styles.successBanner}>
                                ✓ Password changed successfully.
                            </div>
                        )}

                        {/* ── Profile info card ── */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <div className={styles.cardEyebrow}>Personal</div>
                                    <div className={styles.cardTitle}>Profile Information</div>
                                </div>
                                <button
                                    className={`${styles.editBtn}${isEditingProfile ? ` ${styles.editBtnActive}` : ""}`}
                                    onClick={() => isEditingProfile ? handleProfileCancel() : setIsEditingProfile(true)}
                                >
                                    {isEditingProfile ? "Cancel" : "Edit"}
                                </button>
                            </div>

                            {isEditingProfile ? (
                                <form onSubmit={handleProfileSubmit} noValidate>
                                    <div className={styles.formGrid}>

                                        {/* First name */}
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="firstName">First name</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                className={`${styles.input}${profileErrors.firstName ? ` ${styles["input--error"]}` : ""}`}
                                                value={profileForm.firstName}
                                                onChange={handleProfileChange}
                                            />
                                            {profileErrors.firstName && <span className={styles.errorMsg}>{profileErrors.firstName}</span>}
                                        </div>

                                        {/* Last name */}
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="lastName">Last name</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                className={`${styles.input}${profileErrors.lastName ? ` ${styles["input--error"]}` : ""}`}
                                                value={profileForm.lastName}
                                                onChange={handleProfileChange}
                                            />
                                            {profileErrors.lastName && <span className={styles.errorMsg}>{profileErrors.lastName}</span>}
                                        </div>

                                        {/* Email */}
                                        <div className={`${styles.field} ${styles.colSpan2}`}>
                                            <label className={styles.label} htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={`${styles.input}${profileErrors.email ? ` ${styles["input--error"]}` : ""}`}
                                                value={profileForm.email}
                                                onChange={handleProfileChange}
                                            />
                                            {profileErrors.email && <span className={styles.errorMsg}>{profileErrors.email}</span>}
                                        </div>
                                    </div>

                                    <div className={styles.formActions}>
                                        <button type="button" className={styles.btnSecondary} onClick={handleProfileCancel}>
                                            Cancel
                                        </button>
                                        <button type="submit" className={styles.btnPrimary} disabled={profileLoading}>
                                            {profileLoading ? "Saving…" : "Save changes"}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className={styles.formGrid}>
                                    <div className={styles.field}>
                                        <div className={styles.label}>First name</div>
                                        <div className={styles.displayValue}>{user.firstName}</div>
                                    </div>
                                    <div className={styles.field}>
                                        <div className={styles.label}>Last name</div>
                                        <div className={styles.displayValue}>{user.lastName}</div>
                                    </div>
                                    <div className={`${styles.field} ${styles.colSpan2}`}>
                                        <div className={styles.label}>Email</div>
                                        <div className={styles.displayValue}>{user.email}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── Change password card ── */}
                        <Activity mode={user.isGoogleUser ? "hidden" : "visible"}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <div className={styles.cardEyebrow}>Security</div>
                                        <div className={styles.cardTitle}>Change Password</div>
                                    </div>
                                    <button
                                        className={`${styles.editBtn}${isEditingPassword ? ` ${styles.editBtnActive}` : ""}`}
                                        onClick={() => isEditingPassword ? handlePasswordCancel() : setIsEditingPassword(true)}
                                    >
                                        {isEditingPassword ? "Cancel" : "Change"}
                                    </button>
                                </div>

                                <Activity mode={isEditingPassword ? "visible" : "hidden"}>
                                    <form onSubmit={handlePasswordSubmit} noValidate>
                                        <div className={styles.formGrid}>

                                            {/* Current password */}
                                            <div className={`${styles.field} ${styles.colSpan2}`}>
                                                <label className={styles.label} htmlFor="currentPassword">Current password</label>
                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        {...formInputRegister("currentPassword")}
                                                        id="currentPassword"
                                                        type={showCurrent ? "text" : "password"}
                                                        className={`${styles.input} ${styles.inputWithIcon} ${errors.currentPassword && touched.currentPassword ? ` ${styles["input--error"]}` : ""}`}
                                                        placeholder="••••••••"
                                                        autoComplete="current-password"
                                                        onBlur={validateHandler}
                                                    />
                                                    <span className={styles.inputIcon} onClick={() => setShowCurrent(v => !v)}>
                                                        {showCurrent ? "🙈" : "👁"}
                                                    </span>
                                                </div>
                                                {touched.currentPassword && <span className={styles.errorMsg}>{errors.currentPassword}</span>}
                                            </div>

                                            {/* New password */}
                                            <div className={styles.field}>
                                                <label className={styles.label} htmlFor="password">New password</label>
                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        {...formInputRegister("password")}
                                                        id="password"
                                                        type={showNew ? "text" : "password"}
                                                        className={`${styles.input} ${styles.inputWithIcon}${errors.password && touched.password ? ` ${styles["input--error"]}` : ""}`}
                                                        placeholder="Min. 8 characters"
                                                        autoComplete="new-password"
                                                        onBlur={validateHandler}
                                                    />
                                                    <span className={styles.inputIcon} onClick={() => setShowNew(v => !v)}>
                                                        {showNew ? "🙈" : "👁"}
                                                    </span>
                                                </div>
                                                {touched.password && <span className={styles.errorMsg}>{errors.password}</span>}
                                            </div>

                                            {/* Confirm new password */}
                                            <div className={styles.field}>
                                                <label className={styles.label} htmlFor="confirmPassword">Confirm new password</label>
                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        {...formInputRegister("confirmPassword")}
                                                        id="confirmPassword"
                                                        type={showConfirm ? "text" : "password"}
                                                        className={`${styles.input} ${styles.inputWithIcon} ${errors.confirmPassword && touched.confirmPassword ? ` ${styles["input--error"]}` : ""}`}
                                                        placeholder="Repeat new password"
                                                        autoComplete="new-password"
                                                        onBlur={validateHandler}
                                                    />
                                                    <span className={styles.inputIcon} onClick={() => setShowConfirm(v => !v)}>
                                                        {showConfirm ? "🙈" : "👁"}
                                                    </span>
                                                </div>
                                                {touched.confirmPassword && <span className={styles.errorMsg}>{errors.confirmPassword}</span>}
                                            </div>

                                        </div>

                                        <div className={styles.formActions}>
                                            <button type="button" className={styles.btnSecondary} onClick={handlePasswordCancel}>
                                                Cancel
                                            </button>
                                            <button type="submit" className={styles.btnPrimary} disabled={passwordLoading}>
                                                {passwordLoading ? "Updating…" : "Update password"}
                                            </button>
                                        </div>
                                    </form>
                                </Activity>
                                <Activity mode={isEditingPassword ? "hidden" : "visible"}>
                                    <div className={styles.field}>
                                        <div className={styles.label}>Password</div>
                                        <div className={styles.displayValue}>••••••••••••</div>
                                    </div>
                                </Activity>

                            </div>
                        </Activity>
                    </div>

                    {/* ── SIDEBAR ── */}
                    <aside>

                        {/* Account info */}
                        <div className={styles.sidebarCard}>
                            <div className={styles.sidebarCardTitle}>Account Details</div>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Member since</span>
                                    <span className={styles.infoValue}>{convertDate(user.createdAt)}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Sign-in method</span>
                                    <span className={styles.infoValue}>
                                        {user.isGoogleUser ? "Google OAuth" : "Email & password"}
                                    </span>
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
    );
}
