import type { ButtonProps } from "../../types/types";
import styles from "./Buttons.module.css";

export default function ButtonSecondary({ text, width }: ButtonProps) {
    return (
        <button className={`${styles["cta-btn"]} ${styles["cta-btn--secondary"]} ${styles[`${width}`]}`}>{text}</button>
    );
}