import { Activity, useContext, useState } from "react";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router";
import ButtonSecondary from "../buttons/ButtonSecondary";
import UserContext from "../../contexts/UserContext";

export default function Header() {
    const { isAuthenticated, onLogout } = useContext(UserContext);

    const [searchQuery, setSearchQuery] = useState("");

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    function mobileNavHandler() {
        setMobileNavOpen((state) => !state);
    };

    return (
        <nav className={mobileNavOpen ? `${styles["navbar"]} ${styles["logo-hamburger-menu-wrapper-open"]}` : `${styles["navbar"]} ${styles["logo-hamburger-menu-wrapper-close"]}`}>
            <div className={mobileNavOpen ? styles["navbar-left"] : `${styles["navbar-left"]} ${styles["small"]}`}>
                <div className={styles["logo-hamburger-menu-wrapper"]}>
                    <Link to="/" className={styles["logo"]}>
                        Mission<span className={styles["logo-accent"]}>Movie</span>
                    </Link>
                    <div className={styles["hamburger-menu"]} onClick={mobileNavHandler}>
                        <span className={mobileNavOpen ? `${styles["hamburger-menu-span"]} ${styles["hamburger-menu-first-close"]}` : `${styles["hamburger-menu-span"]} ${styles["hamburger-menu-first-open"]}`}></span>
                        <span className={mobileNavOpen ? `${styles["hamburger-menu-span"]} ${styles["hamburger-menu-second-close"]}` : `${styles["hamburger-menu-span"]} ${styles["hamburger-menu-second-open"]}`}></span>
                        <span className={mobileNavOpen ? `${styles["hamburger-menu-span"]} ${styles["hamburger-menu-third-close"]}` : `${styles["hamburger-menu-span"]} ${styles["hamburger-menu-third-open"]}`}></span>
                    </div>
                </div>
                <div className={styles["navbar-links"]}>
                    <NavLink to="/" className={styles["nav-link"]}>Home</NavLink>
                    <NavLink to="/catalog/movies" className={styles["nav-link"]}>Movies</NavLink>
                    <NavLink to="/catalog/reviews" className={styles["nav-link"]}>Reviews</NavLink>
                    <NavLink to="#" className={styles["nav-link"]}>Directors</NavLink>
                    <NavLink to="#" className={styles["nav-link"]}>Comunity</NavLink>
                </div>
            </div>
            <div className={styles["navbar-right"]}>
                <div className={styles["search-wrapper"]}>
                    <span className={styles["search-icon"]}>⌕</span>
                    <input
                        className={styles["search-input"]}
                        placeholder="Search films…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Activity mode={isAuthenticated ? "hidden" : "visible"}>
                    <Link to="/login">
                        <ButtonSecondary text="Sign in" />
                    </Link>
                    <Link to="/register">
                        <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]}`}>Join</button>
                    </Link>
                </Activity>
                <Activity mode={isAuthenticated ? "visible" : "hidden"}>
                    <ButtonSecondary text="Logout" clickHandler={onLogout}/>
                </Activity>

            </div>
        </nav>
    );
}