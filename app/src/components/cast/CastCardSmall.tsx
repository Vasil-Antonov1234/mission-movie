import { Link } from "react-router";
import styles from "./CastCardSmall.module.css"
import theme from "../Theme.module.css";
import type { CastSmall } from "../../types/types";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function CastCardSmall(props: CastSmall) {
    const { isDarkTheme } = useContext(UserContext);

    return (
        <Link to={`/casts/${props.id}/details`} className={`${styles["cast-card"]} ${!isDarkTheme ? theme["box"] : ""}`}>
            <div className={styles["cast-card-img-wrapper"]}>
                <img src={`${props.imageUrl}`} alt={`${props.firstName} ${props.lastName}`} className={styles["cast-card-img"]} />
            </div>
            <div className={styles["cast-card-body"]}>
                <div className={styles["cast-card-title"]}>{`${props.firstName} ${props.lastName}`}</div>
            </div>
        </Link>
    );
}