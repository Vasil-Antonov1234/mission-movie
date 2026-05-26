import type { ButtonProps } from "../../types/types";
import styles from "./Buttons.module.css";

export default function ButtonChost({ text, addStyle: styleName }: ButtonProps) {
    return (
        <button className={`${styles["cta-btn"]} ${styles["cta-btn--ghost"]} ${styles[`${styleName}`]}`}>{text}</button>
    );
}