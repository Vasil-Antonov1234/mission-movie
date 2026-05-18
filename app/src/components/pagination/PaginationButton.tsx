import styles from "./PaginationButton.module.css";

type PaginationButtonProps = { count: number };

export default function PaginationButton(props: PaginationButtonProps) {
    return (
        <div className={styles["page-button"]}>{ props.count }</div>
    );
}