import styles from "./ActorDetail.module.css";
import { Link } from "react-router"

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Film {
  id: number;
  title: string;
  year: number;
  rating: number;
  role: string;
  poster: string;
}

interface Award {
  id: number;
  title: string;
  event: string;
  year: number;
  won: boolean;
}

interface Costar {
  id: number;
  name: string;
  photo: string;
  filmsCount: number;
}

interface SocialLink {
  label: string;
  icon: string;
  url: string;
}

interface Actor {
  id: number;
  name: string;
  photo: string;
  backdrop: string;
  born: string;
  birthplace: string;
  nationality: string;
  height: string;
  knownFor: string[];
  bio: string[];
  filmography: Film[];
  awards: Award[];
  costars: Costar[];
  social: SocialLink[];
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const ACTOR: Actor = {
  id: 1,
  name: "Cillian Murphy",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1400&q=80",
  born: "May 25, 1976",
  birthplace: "Douglas, Cork, Ireland",
  nationality: "Irish",
  height: "5′ 9″ (175 cm)",
  knownFor: ["Drama", "Thriller", "Sci-Fi"],
  bio: [
    "Cillian Murphy is an Irish actor who first gained widespread recognition for his role as Tommy Shelby in the BBC series Peaky Blinders. Known for his piercing blue eyes and chameleonic versatility, he has established himself as one of the most compelling screen presences of his generation.",
    "Murphy trained at University College Cork and initially pursued a music career before transitioning to acting. His film career took off with Danny Boyle's 28 Days Later (2002), followed by a string of collaborations with Christopher Nolan — most notably Batman Begins, Inception, Dunkirk, and Oppenheimer, for which he won the Academy Award for Best Actor in 2024.",
  ],
  filmography: [
    {
      id: 1,
      title: "Oppenheimer",
      year: 2023,
      rating: 8.9,
      role: "J. Robert Oppenheimer",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
    },
    {
      id: 2,
      title: "Peaky Blinders",
      year: 2013,
      rating: 8.8,
      role: "Tommy Shelby",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    },
    {
      id: 3,
      title: "28 Days Later",
      year: 2002,
      rating: 7.6,
      role: "Jim",
      poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
    },
    {
      id: 4,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      role: "Robert Fischer",
      poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80",
    },
  ],
  awards: [
    {
      id: 1,
      title: "Academy Award — Best Actor",
      event: "96th Academy Awards",
      year: 2024,
      won: true,
    },
    {
      id: 2,
      title: "Golden Globe — Best Actor in a Motion Picture Drama",
      event: "81st Golden Globe Awards",
      year: 2024,
      won: true,
    },
    {
      id: 3,
      title: "BAFTA — Best Actor in a Leading Role",
      event: "77th BAFTA Film Awards",
      year: 2024,
      won: true,
    },
    {
      id: 4,
      title: "Screen Actors Guild — Outstanding Performance",
      event: "30th SAG Awards",
      year: 2024,
      won: false,
    },
  ],
  costars: [
    {
      id: 1,
      name: "Emily Blunt",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      filmsCount: 1,
    },
    {
      id: 2,
      name: "Matt Damon",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      filmsCount: 1,
    },
    {
      id: 3,
      name: "Robert Downey Jr.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      filmsCount: 1,
    },
  ],
  social: [
    { label: "IMDb Profile", icon: "🎬", url: "https://imdb.com" },
    { label: "Wikipedia", icon: "📖", url: "https://wikipedia.org" }
  ],
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ActorDetail() {
  const actor = ACTOR;

  return (
    <div className={styles.wrapper}>

      {/* ─── HERO ─── */}
      <div className={styles.hero}>
        <img
          src={actor.backdrop}
          alt={actor.name}
          className={styles.heroBackdrop}
        />
        <div className={styles.heroOverlayH} />
        <div className={styles.heroOverlayV} />

        <div className={styles.heroContent}>
          {/* Photo */}
          <div className={styles.photoWrapper}>
            <img
              src={actor.photo}
              alt={actor.name}
              className={styles.photo}
            />
          </div>

          {/* Info */}
          <div className={styles.heroInfo}>
            <div className={styles.eyebrow}>Actor</div>
            <h1 className={styles.name}>{actor.name}</h1>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>{actor.nationality}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.metaItem}>b. {actor.born}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BODY ─── */}
      <div className={styles.body}>

        {/* ── MAIN COLUMN ── */}
        <main className={styles.main}>

          {/* Biography */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>About</div>
            <h2 className={styles.sectionHeading}>Biography</h2>
            {actor.bio.map((paragraph, i) => (
              <p key={i} className={styles.bioText}>{paragraph}</p>
            ))}
          </section>

          <hr className={styles.sectionDivider} />

          {/* Filmography */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Credits</div>
            <h2 className={styles.sectionHeading}>Filmography</h2>
            <div className={styles.filmGrid}>
              {actor.filmography.map((film) => (
                <div key={film.id} className={styles.filmCard}>
                  <img
                    src={film.poster}
                    alt={film.title}
                    className={styles.filmCardImg}
                  />
                  <div className={styles.filmCardBody}>
                    <div className={styles.filmCardTitle}>{film.title}</div>
                    <div className={styles.filmCardRole}>{film.role}</div>
                    <div className={styles.filmCardFooter}>
                      <span className={styles.filmCardYear}>{film.year}</span>
                      <span className={styles.ratingBadge}>★ {film.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className={styles.sectionDivider} />

          {/* Awards */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Recognition</div>
            <h2 className={styles.sectionHeading}>Awards & Nominations</h2>
            <div className={styles.awardsList}>
              {actor.awards.map((award) => (
                <div key={award.id} className={styles.awardItem}>
                  <span className={styles.awardIcon}>
                    {award.won ? "🏆" : "🎖️"}
                  </span>
                  <div className={styles.awardBody}>
                    <div className={styles.awardTitle}>{award.title}</div>
                    <div className={styles.awardMeta}>
                      {award.event} · {award.year} ·{" "}
                      <span className={award.won ? styles.awardWon : ""}>
                        {award.won ? "Won" : "Nominated"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>

          {/* Personal details */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarCardTitle}>Personal Details</div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Born</span>
                <span className={styles.infoValue}>{actor.born}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Birthplace</span>
                <span className={styles.infoValue}>{actor.birthplace}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nationality</span>
                <span className={styles.infoValue}>{actor.nationality}</span>
              </div>
            </div>
          </div>

          {/* Social / External links */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarCardTitle}>External Links</div>
            <div className={styles.socialList}>
              {actor.social.map((link) => (
                <Link
                  key={link.label}
                  to={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon}>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>        
        </aside>
      </div>
    </div>
  );
}
