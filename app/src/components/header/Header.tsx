import { Activity, useContext, useState } from "react";
import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router";
import ButtonSecondary from "../buttons/ButtonSecondary";
import UserContext from "../../contexts/UserContext";


export default function Header() {
    const { isAuthenticated, onLogout } = useContext(UserContext);

    const [searchQuery, setSearchQuery] = useState("");
    // const [isActive, setIsactive] = useState(false);
    // const [movies, setMovies] = useState<Movie[]>([]);

    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function mobileNavHandler() {
        setMobileNavOpen((state) => !state);
    };

    function keyPressHandler(event: React.KeyboardEvent) {
        
        if(event.code === "Enter") {
            return search()
        };

    };


    function search() {
        
        if (!searchQuery.trim()) {
            return;
        };

        navigate("/search", { state: { searchQuery } } )
    }

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
                    <NavLink to="/movies/catalog" className={styles["nav-link"]}>Movies</NavLink>
                    <NavLink to="/reviews/catalog" className={styles["nav-link"]}>Reviews</NavLink>
                    <NavLink to="/cast/catalog" className={styles["nav-link"]}>Actors</NavLink>
                </div>
            </div>
            <div className={styles["navbar-right"]}>
                <div className={styles["search-wrapper"]}>
                    {/* <span className={styles["search-icon"]}>⌕</span> */}
                    <input
                        className={styles["search-input"]}
                        placeholder="Search…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(event) => keyPressHandler(event)}
                    />
                </div>
                <ButtonSecondary
                    text="⌕"
                    clickHandler={search}
                    addStyle={`${"search-icon"}`}
                    addStyle1={searchQuery.trim().length ? "search-icon-active" : ""}
                />
                <Activity mode={isAuthenticated ? "hidden" : "visible"}>
                    <Link to="/login">
                        <ButtonSecondary text="Sign in" />
                    </Link>
                    <Link to="/register">
                        <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]}`}>Join</button>
                    </Link>
                </Activity>
                <Activity mode={isAuthenticated ? "visible" : "hidden"}>
                    <Link to="/movies/create">
                        <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]}`}>Add movie</button>
                    </Link>
                    <Link to="/casts/create">
                        <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]}`}>Add cast</button>
                    </Link>
                    <Link to="/reviews/create">
                        <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]}`}>Write review</button>
                    </Link>
                    <ButtonSecondary text="Logout" clickHandler={onLogout} />
                </Activity>
                <Link to="/users/profile" className={styles["nav-link"]}>{user.firstName} {user.lastName}</Link>
            </div>
        </nav>
    );
}