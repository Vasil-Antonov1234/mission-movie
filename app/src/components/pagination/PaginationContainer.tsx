import PaginationButton from "./PaginationButton";
import styles from "./PaginationContainer.module.css";

type PaginationContainerProps = { count: number[] }

export default function PaginationContainer(props: PaginationContainerProps) {
    return (
        <section className={styles["pages-container"]}>
            {props.count.map((button) => <PaginationButton count={button} />)}
        </section>
    );
}