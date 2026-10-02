import { useNavigate } from "react-router";
import styles from "./Legal.module.css";
import usePageTitle from "../../hooks/usePageTitle";

const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    content: [
      "At Reelist, we take your privacy seriously. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.",
      "By using Reelist, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    content: [
      "We collect information you provide directly when you register, update your profile, write reviews, or contact us.",
    ],
    list: [
      "Account information — first name, last name, email address, and password (stored as a secure hash)",
      "Profile information — bio and any optional details you choose to add",
      "Content you create — reviews, comments, lists, and ratings",
      "Sign-in method — whether you registered with email/password or via Google OAuth",
      "Usage data — pages visited, features used, and interactions with the platform",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: [
      "We use the information we collect solely to provide, maintain, and improve the Reelist platform.",
    ],
    list: [
      "To create and manage your account",
      "To display your reviews and content to other users",
      "To send important account-related notifications",
      "To detect and prevent fraudulent or abusive activity",
      "To improve the platform based on how it is used",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We do not display advertising on Reelist.",
      "Your public content — reviews, ratings, and lists — is visible to all users of the platform. Your email address is never publicly visible.",
    ],
    list: [
      "Google OAuth — if you sign in with Google, we receive your name, email, and profile photo from Google in accordance with their privacy policy",
      "Hosting providers — your data is stored on servers provided by our hosting partner, subject to their data processing terms",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      "We retain your personal data for as long as your account is active. If you delete your account, your personal information and content will be permanently removed from our systems within 30 days.",
      "Some anonymised usage data may be retained for analytical purposes after account deletion.",
    ],
  },
  {
    id: "security",
    title: "Security",
    content: [
      "We take reasonable steps to protect your information, including storing passwords as bcrypt hashes, using JWT-based authentication, and maintaining a token blacklist for invalidated sessions.",
      "However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      "You have the following rights in relation to your personal data:",
    ],
    list: [
      "Access — you can view your personal information from your profile page",
      "Correction — you can update your information at any time from your profile settings",
      "Deletion — you can permanently delete your account from the danger zone in your profile settings",
      "Portability — you may request a copy of your data by contacting us",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Local Storage",
    content: [
      "Reelist uses browser localStorage to store your authentication token and maintain your session. We do not use tracking cookies or third-party analytics cookies.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on the platform. Continued use of Reelist after changes are posted constitutes your acceptance of the updated policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: [
      "If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at the email address below.",
    ],
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  usePageTitle("Privacy policy")

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* ─── Header ─── */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Legal</div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.meta}>
            Last updated: <span className={styles.metaAccent}>September 1, 2026</span>
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
            Privacy concerns?{" "}
            <a href="mailto:privacy@reelist.com" className={styles.contactEmail}>
              privacy@reelist.com
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
