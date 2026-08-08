import { Activity } from "react";
import { useFormStatus } from "react-dom";
import styles from "./Loading.module.css";

export default function Loading() {

    const { pending } = useFormStatus();


    return (
        <Activity
            mode={pending ? "visible" : "hidden"}
            children={<div className={styles["loading"]}>Loading
                <span className={styles["loading-dot1"]}>.</span>
                <span className={styles["loading-dot2"]}>.</span>
                <span className={styles["loading-dot3"]}>.</span>
            </div>}
        />
    )
};