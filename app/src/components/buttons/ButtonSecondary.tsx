import type { ButtonProps } from "../../types/types";
import styles from "./Buttons.module.css";

export default function ButtonSecondary({ text, addStyle: styleName, addStyle1: styleName1, clickHandler }: ButtonProps) {
    return (
        <button onClick={clickHandler} className={`${styles["cta-btn"]} ${styles["cta-btn--secondary"]} ${styles[`${styleName}`]} ${styles[`${styleName1}`]}`}>{text}</button>
    );
}