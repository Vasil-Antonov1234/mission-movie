import type { ButtonProps } from "../../types/types";
import styles from "./Buttons.module.css";

export default function ButtonChost({ text, width }: ButtonProps) {
    return (
        <button className={`${styles["cta-btn"]} ${styles["cta-btn--ghost"]} ${styles[`${width}`]}`}>{text}</button>
    );
}