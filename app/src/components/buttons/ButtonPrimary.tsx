import type { ButtonProps } from "../../types/types";
import styles from "./Buttons.module.css";

export default function ButtonPrimary({ text, addStyle: styleName }: ButtonProps) {
    return (
        <button className={`${styles["cta-btn"]} ${styles["cta-btn--primary"]} ${styles[`${styleName}`]}`}>{text}</button>
    );
}