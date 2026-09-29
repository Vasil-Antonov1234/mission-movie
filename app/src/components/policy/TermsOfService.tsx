import { useNavigate } from "react-router";
import styles from "./Legal.module.css";

const SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Reelist, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.",
      "We reserve the right to update these terms at any time. Continued use of Reelist after changes are posted constitutes your acceptance of the revised terms.",
    ],
  },
  {
    id: "account",
    title: "Your Account",
    content: [
      "You must be at least 13 years old to create an account on Reelist. By registering, you confirm that the information you provide is accurate and complete.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorised use.",
    ],
    list: [
      "Do not share your password with others",
      "Use a strong, unique password for your account",
      "Log out of shared devices after use",
    ],
  },
  {
    id: "content",
    title: "User Content",
    content: [
      "Reelist allows you to post reviews, comments, and lists. You retain ownership of the content you create, but by posting it you grant Reelist a non-exclusive, royalty-free licence to display and distribute that content on the platform.",
      "You agree not to post content that is unlawful, defamatory, harassing, obscene, or otherwise objectionable. We reserve the right to remove content that violates these terms.",
    ],
    list: [
      "Do not post spoilers without appropriate warnings",
      "Do not plagiarise reviews or other content",
      "Do not impersonate other users or public figures",
      "Do not post spam or promotional content",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Conduct",
    content: [
      "You agree not to misuse Reelist or help anyone else do so. The following conduct is strictly prohibited:",
    ],
    list: [
      "Attempting to gain unauthorised access to other accounts or systems",
      "Scraping or harvesting data from the platform without permission",
      "Using the platform to distribute malware or harmful code",
      "Interfering with or disrupting the platform's infrastructure",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content: [
      "We may suspend or terminate your account at any time if you violate these terms or engage in conduct harmful to the platform or its users.",
      "You may delete your account at any time from your profile settings. Upon deletion, your data will be removed in accordance with our Privacy Policy.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    content: [
      "Reelist is provided on an 'as is' basis without warranties of any kind. We do not guarantee that the platform will be available at all times or free from errors.",
      "This is a student project. Film data and ratings on this platform are user-generated and should not be taken as professional critical opinion.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: [
      "If you have any questions about these Terms of Service, please contact us at the email address below.",
    ],
  },
];

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* ─── Header ─── */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Legal</div>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.meta}>
            Last updated: <span className={styles.metaAccent}>January 1, 2024</span>
          </p>
        </div>

        {/* ─── Table of contents ─── */}
        <div className={styles.toc}>
          <div className={styles.tocTitle}>Contents</div>
          <ol className={styles.tocList}>
            {SECTIONS.map((s, i) => (
              <li key={s.id} className={styles.tocItem}>
                <a href={`#${s.id}`} className={styles.tocLink}>
                  <span className={styles.tocNumber}>{i + 1}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ─── Sections ─── */}
        <div className={styles.sections}>
          {SECTIONS.map((section, i) => (
            <div key={section.id} className={styles.section}>
              <span id={section.id} className={styles.sectionAnchor} />
              <div className={styles.sectionNumber}>§{i + 1}</div>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.content.map((paragraph, j) => (
                <p key={j} className={styles.sectionText}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className={styles.sectionList}>
                  {section.list.map((item) => (
                    <li key={item} className={styles.sectionListItem}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* ─── Contact card ─── */}
        <div className={styles.contactCard}>
          <p className={styles.contactText}>
            Questions about these terms?{" "}
            <a href="mailto:legal@reelist.com" className={styles.contactEmail}>
              legal@reelist.com
            </a>
          </p>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← Go back
          </button>
        </div>

      </div>
    </div>
  );
}
