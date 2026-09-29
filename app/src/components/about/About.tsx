import { useNavigate } from "react-router";
import styles from "./About.module.css";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "🎬",
    title: "Track Every Film",
    text: "Log every movie you have ever watched. Build a personal catalogue that grows with you.",
  },
  {
    icon: "✍️",
    title: "Write Reviews",
    text: "Share your take with the community. Rate films, break down scores, and articulate what makes cinema matter.",
  },
  {
    icon: "📋",
    title: "Build Lists",
    text: "Curate thematic collections — your favourite Nolan films, every Palme d'Or winner, films to watch before you turn 30.",
  },
  {
    icon: "🔍",
    title: "Discover Films",
    text: "Find your next favourite through genre filters, director pages, and community recommendations.",
  },
  {
    icon: "👥",
    title: "Connect",
    text: "Follow critics whose taste you trust. See what your friends are watching and what they think.",
  },
  {
    icon: "🏆",
    title: "Awards & Recognition",
    text: "Explore award history, track nominees, and see which films the community crowns as masterpieces.",
  },
];

const TECH = [
  "React.js", "TypeScript", "Node.js", "Express",
  "PostgreSQL", "Prisma", "JWT Auth", "Google OAuth",
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function About() {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBgBlur} />
        <div className={styles.heroEyebrow}>About Mission Movie</div>
        <div className={styles.heroLogo}>
          Mission<span className={styles.heroLogoAccent}>Movie</span>
        </div>
        <p className={styles.heroTagline}>
          "Cinema is a mirror by which we often see ourselves."
        </p>
        <p className={styles.heroDescription}>
          MissionMovie is a community-driven movie blog where cinephiles track films,
          write honest reviews, and connect with others who take cinema seriously.
          Built for people who believe that watching films is more than a pastime —
          it's a way of seeing the world.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.btnPrimary} onClick={() => navigate("/register")}>
            Join for free
          </button>
          <button className={styles.btnSecondary} onClick={() => navigate("/movies/catalog")}>
            Browse films
          </button>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <div className={styles.statsBand}>
        <div className={styles.statsInner}>
          {[
            { value: "12K+",  label: "Members"       },
            { value: "84K+",  label: "Films tracked" },
            { value: "21K+",  label: "Reviews"       },
            { value: "3.2K+", label: "Lists"         },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className={styles.container}>

        {/* Our story */}
        <section className={styles.section}>
          <div className={styles.sectionEyebrow}>Our story</div>
          <h2 className={styles.sectionTitle}>Why we built Mission Movie</h2>
          <p className={styles.sectionText}>
            Mission Movie started from a simple frustration — existing film platforms
            felt either too cluttered with noise, or too bare to be useful. We
            wanted something that respected both the films and the people who
            love them. Something that felt more like a well-curated magazine than
            a database.
          </p>
          <p className={styles.sectionText}>
            We believe film criticism matters. A great review doesn't just tell
            you whether to watch something — it helps you understand why a film
            works, what it's saying, and why it stays with you. Mission Movie is built
            around that conviction.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* Features */}
        <section className={styles.section}>
          <div className={styles.sectionEyebrow}>What we offer</div>
          <h2 className={styles.sectionTitle}>Everything a cinephile needs</h2>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div className={styles.featureTitle}>{f.title}</div>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Manifesto */}
        <section className={styles.section}>
          <div className={styles.sectionEyebrow}>Our philosophy</div>
          <h2 className={styles.sectionTitle}>What we believe</h2>
          <div className={styles.manifestoCard}>
            <p className={styles.manifestoText}>
              We believe cinema is one of the most powerful art forms humans
              have ever created. A great film can make you feel less alone,
              show you a life you'll never live, or change the way you see
              your own.
            </p>
            <p className={styles.manifestoText}>
              We believe every film deserves a thoughtful audience, and every
              thoughtful audience deserves a place to be heard. Mission Movie is
              that place — free of algorithms that flatten taste, and free of
              the pressure to be anything other than honest.
            </p>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Built with */}
        <section className={styles.section}>
          <div className={styles.sectionEyebrow}>Under the hood</div>
          <h2 className={styles.sectionTitle}>Built with</h2>
          <p className={styles.sectionText}>
            Mission Movie is a full-stack web application built as a student project,
            with a focus on clean architecture, real-world authentication, and
            a design system that takes the subject matter seriously.
          </p>
          <div className={styles.techList}>
            {TECH.map((t) => (
              <span key={t} className={styles.techTag}>{t}</span>
            ))}
          </div>
        </section>
      </div>

      {/* ─── CTA BAND ─── */}
      <div className={styles.ctaBand}>
        <h2 className={styles.ctaTitle}>Ready to start tracking?</h2>
        <p className={styles.ctaText}>
          Join numbers of cinephiles already on Mission Movie. Free forever.
        </p>
        <button className={styles.btnPrimary} onClick={() => navigate("/register")}>
          Create your account
        </button>
      </div>

    </div>
  );
}
