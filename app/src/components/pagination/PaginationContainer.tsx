import { useState } from "react";
import PaginationButton from "./PaginationButton";
import styles from "./PaginationContainer.module.css";

type PaginationContainerProps = { count: number[] }


export default function PaginationContainer(props: PaginationContainerProps) {
    const [activePage, setActivePage] = useState(1);

    function activePageHandler(page: number) {
        setActivePage(page)
    }

    return (
        <section className={styles["pages-container"]}>
            {props.count.map((button) => <PaginationButton count={button} onPageChange={activePageHandler} page={activePage} />)}
        </section>
    );
}