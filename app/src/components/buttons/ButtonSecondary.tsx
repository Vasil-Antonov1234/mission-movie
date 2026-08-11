import type { ButtonProps } from "../../types/types";
import styles from "./Buttons.module.css";

export default function ButtonSecondary({ text, addStyle: styleName, clickHandler }: ButtonProps) {
    return (
        <button onClick={clickHandler? clickHandler : () => {}} className={`${styles["cta-btn"]} ${styles["cta-btn--secondary"]} ${styles[`${styleName}`]}`}>{text}</button>
    );
}