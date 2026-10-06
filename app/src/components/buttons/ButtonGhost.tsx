import type { ButtonProps } from "../../types/types";
import styles from "./Buttons.module.css";

export default function ButtonChost({ text, addStyle: styleName, addStyle1: styleName1, clickHandler }: ButtonProps) {
    return (
        <button className={`${styles["cta-btn"]} ${styles["cta-btn--ghost"]} ${styles[`${styleName}`]} ${styles[`${styleName1}`]}`} onClick={clickHandler}>{text}</button>
    );
}