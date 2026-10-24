import styles from "./Comment.module.css"
import theme from "../Theme.module.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

type StarRatingProps = { rating: number }

export default function StarRating({ rating }: StarRatingProps) {
    const { isDarkTheme } = useContext(UserContext)

    const filled = Math.round((rating / 10) * 10);
    return (
        <span className={`${styles["star-rating"]} ${isDarkTheme ? "" : theme["pageEyebrow"]}`}>
            {"★".repeat(filled)}{"☆".repeat(10 - filled)}
        </span>
    );
}