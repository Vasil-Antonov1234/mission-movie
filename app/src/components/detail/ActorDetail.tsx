import { Activity, useContext } from "react";
import styles from "./ActorDetail.module.css";
import { Link, useNavigate, useParams } from "react-router"
import type { Actor, Movie } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import ButtonSecondary from "../buttons/ButtonSecondary";
import UserContext from "../../contexts/UserContext";
import { errorMessageHandler } from "../../utils/errorUtil";

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ActorDetail() {
  const castId = useParams().castId;
  const initialStateActor: Actor = {
    id: 0,
    firstName: "",
    lastName: ""
  };
  const initialStateMovie: Movie[] = []

  const { data: movies } = useFetch(`/movies/filmography/${castId}`, initialStateMovie);
  const { data, request } = useFetch(`/casts/${castId}`, initialStateActor);
  const { user, onLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const filmography = movies ? movies : [];

  const isOwner = data?.authorId === user.id;

  async function deleteHandler() {
    
    if (!isOwner) {
      alert("Unauthorised");
      onLogout("/login");
    }

    const confirmation = confirm(`Are you sure you want to delete ${data?.firstName} ${data?.lastName}`);

    if (!confirmation) {
      return;
    };

    try {
      await request(`/casts/${castId}`, "DELETE", { accessToken: user.accessToken });

      navigate("/");
    } catch (error) {
      errorMessageHandler(error);
    };
  }

  return (
    <div className={styles.wrapper}>

      {/* ─── HERO ─── */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Photo */}
          <div className={styles.photoWrapper}>
            <img
              src={data?.imageUrl}
              alt={`${data?.firstName} ${data?.lastName}`}
              className={styles.photo}
            />
          </div>

          {/* Info */}
          <div className={styles.heroInfo}>
            <div className={styles.eyebrow}>Actor</div>
            <h1 className={styles.name}>{`${data?.firstName} ${data?.lastName}`}</h1>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>{data?.placeOfBorn}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.metaItem}>{data?.bornDate}</span>
            </div>
            <Activity mode={isOwner ? "visible": "hidden"}>
              <div className={styles["detail-hero-actions"]}>
                <Link to={`/casts/${castId}/edit`}>
                  <ButtonSecondary text="Edit" addStyle="btn-gray" />
                </Link>
                <ButtonSecondary clickHandler={deleteHandler} text="Delete" addStyle="btn-red" />
              </div>
            </Activity>
          </div>
        </div>
      </div>


      {/* ─── BODY ─── */}
      <div className={styles.body}>

        {/* ── MAIN COLUMN ── */}
        <main className={styles.main}>

          {/* Biography */}
          <Activity mode={data?.biography ? "visible" : "hidden"}>
            <section className={styles.section}>
              <div className={styles.sectionLabel}>About</div>
              <h2 className={styles.sectionHeading}>Biography</h2>
              <p className={styles.bioText}>{data?.biography}</p>
            </section>

            <hr className={styles.sectionDivider} />
          </Activity>

          {/* Filmography */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Credits</div>
            <h2 className={styles.sectionHeading}>Filmography</h2>
            <div className={styles.filmGrid}>
              {filmography.map((x) => (
                <Link key={x.id} to={`/movies/${x.id}/details`} className={styles.link}>
                  <div className={styles.filmCard}>
                    <img
                      src={x.poster}
                      alt={x.title}
                      className={styles.filmCardImg}
                    />
                    <div className={styles.filmCardBody}>
                      <div className={styles.filmCardTitle}>{x.title}</div>
                      <div className={styles.filmCardFooter}>
                        <span className={styles.filmCardYear}>{x.year}</span>
                        <span className={styles.ratingBadge}>★ {x.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <hr className={styles.sectionDivider} />

          {/* Awards */}
          <Activity mode={data?.awards ? "visible" : "hidden"}>
            <section className={styles.section}>
              <div className={styles.sectionLabel}>Recognition</div>
              <h2 className={styles.sectionHeading}>Awards & Nominations</h2>
              <div className={styles.awardsList}>
                <div className={styles.awardItem}>
                  <span className={styles.awardIcon}>🏆</span>
                  <div className={styles.awardBody}>
                    <div className={styles.awardTitle}>{data?.awards}</div>
                  </div>
                </div>
              </div>
            </section>
          </Activity>

        </main>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>

          {/* Personal details */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarCardTitle}>Personal Details</div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Born</span>
                <span className={styles.infoValue}>{data?.bornDate}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Birthplace</span>
                <span className={styles.infoValue}>{data?.placeOfBorn}</span>
              </div>
            </div>
          </div>

          {/* Social / External links */}
          <Activity mode={data?.imdbProfile || data?.wikipedia ? "visible" : "hidden"}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarCardTitle}>External Links</div>
              <div className={styles.socialList}>
                <Link
                  to={data?.imdbProfile ? data.imdbProfile : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon}>🎬</span>
                  IMDb Profile
                </Link>

                <Link
                  to={data?.wikipedia ? data.wikipedia : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon}>📖</span>
                  Wikipedia
                </Link>
              </div>
            </div>
          </Activity>
        </aside>
      </div>
    </div>
  );
}
