import { useState } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router";

export default function Header() {

    const [searchQuery, setSearchQuery] = useState("");

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    function mobileNavHandler() {
        setMobileNavOpen((state) => !state);
    };

    return (
        <nav className={mobileNavOpen ? `${styles["navbar"]} ${styles["logo-hamburger-menu-wrapper-open"]}` : `${styles["navbar"]} ${styles["logo-hamburger-menu-wrapper-close"]}`}>
            <div className={styles["navbar-left"]}>
                <div className={styles["logo-hamburger-menu-wrapper"]}>
                    <div className={styles["logo"]}>
                        Mission<span className={styles["logo-accent"]}>Movie</span>
                    </div>
                    <div className={styles["hamburger-menu"]} onClick={mobileNavHandler}>
                        <span className={styles["hamburger-menu-first"]}></span>
                        <span className={styles["hamburger-menu-second"]}></span>
                        <span className={styles["hamburger-menu-third"]}></span>
                    </div>
                </div>
                <div className={styles["navbar-links"]}>
                    <NavLink to="/" className={styles["nav-link"]}>Home</NavLink>
                    <NavLink to="/catalog" className={styles["nav-link"]}>Reviews</NavLink>
                    <NavLink to="#" className={styles["nav-link"]}>Lists</NavLink>
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
                <button className={`${styles["cta-btn"]} ${styles["cta-btn--secondary"]}`}>Sign in</button>
                <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]}`}>Join</button>
            </div>
        </nav>
    );
}