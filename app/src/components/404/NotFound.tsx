import { useNavigate } from "react-router";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgBlurGold} />
      <div className={styles.bgBlurDark} />

      <div className={styles.content}>

        {/* 404 number */}
        <div className={styles.errorCode}>
          4<span className={styles.errorCodeAccent}>0</span>4
        </div>

        {/* Film strip decoration */}
        <div className={styles.filmStrip}>
          <div className={styles.filmStripDot} />
          <div className={styles.filmStripLine} />
          <div className={`${styles.filmStripDot} ${styles.filmStripDotActive}`} />
          <div className={styles.filmStripLine} />
          <div className={styles.filmStripDot} />
          <div className={styles.filmStripLine} />
          <div className={`${styles.filmStripDot} ${styles.filmStripDotActive}`} />
          <div className={styles.filmStripLine} />
          <div className={styles.filmStripDot} />
        </div>

        {/* Text */}
        <div className={styles.eyebrow}>Scene not found</div>
        <h1 className={styles.heading}>
          Looks like this reel is missing.
        </h1>
        <p className={styles.description}>
          The page you're looking for may have been moved, deleted, or never
          existed. Let's get you back to the films.
        </p>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={() => navigate("/")}>
            ← Back to Home
          </button>
          <button className={styles.btnSecondary} onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>

        {/* Quick links */}
        <div className={styles.suggestionsLabel}>Or explore</div>
        <div className={styles.suggestionLinks}>
          {[
            { label: "Reviews",   path: "/reviews/catalog"   },
            { label: "Actors", path: "/cast/catalog" },
            { label: "Movies", path: "/movies/catalog" },
            { label: "About us", path: "/about" },
          ].map((link) => (
            <button
              key={link.path}
              className={styles.suggestionLink}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
