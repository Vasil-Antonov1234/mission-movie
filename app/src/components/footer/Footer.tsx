import styles from "./Footer.module.css";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className={styles["footer"]}>
            <section className={styles["footer-wrapper"]}>
                <div className={styles["footer-logo"]}>
                    mission<span className={styles["footer-logo-accent"]}>movie</span>
                </div>
                <div>
                    <ul className={styles["footer-links"]}>
                        <li>
                            <Link to="/about" className={`${styles["nav-link"]} ${styles["footer-nav-link"]}`}>About</Link>
                        </li>
                        <li>
                            <Link to="/privacy" className={`${styles["nav-link"]} ${styles["footer-nav-link"]}`}>Privacy</Link>
                        </li>
                        <li><Link to="/terms" className={`${styles["nav-link"]} ${styles["footer-nav-link"]}`}>Terms</Link></li>
                    </ul>
                </div>
                <div className={styles["footer-copy"]}>© 2026 mm</div>
            </section>
        </footer>
    )
}