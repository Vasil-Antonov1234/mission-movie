import styles from "./PaginationButton.module.css";

type PaginationButtonProps = { count: number | string, onPageChange: (page: number | string)=> void, page: number | null };

export default function PaginationButton(props: PaginationButtonProps) {
    return (
        <div className={props.count === props.page ? styles["page-button-active"] : styles["page-button"]} onClick={() => props.onPageChange(props.count)}>{ props.count }</div>
    );
}