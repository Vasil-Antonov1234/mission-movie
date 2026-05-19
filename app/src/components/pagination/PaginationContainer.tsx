import { useState } from "react";
import PaginationButton from "./PaginationButton";
import styles from "./PaginationContainer.module.css";

type PaginationContainerProps = { count: number[] | string }


export default function PaginationContainer(props: PaginationContainerProps) {
    const [activePage, setActivePage] = useState(1);

    function activePageHandler(page: number | string) {
        
        if (typeof(page) === "number") {
            setActivePage(page)
        }

    };

    function previewsPageHandler() {
        setActivePage((state) => state - 1)
    };

    function nextPageHandler() {
        setActivePage((state) => state + 1);
    };

    return (
        <section className={styles["pages-container"]}>
            <PaginationButton count={"<"} onPageChange={previewsPageHandler} page={null} />
            {typeof(props.count) !== "string" ? props.count.map((button) => <PaginationButton count={button} onPageChange={activePageHandler} page={activePage} />) : ""}
            <PaginationButton count={">"} onPageChange={nextPageHandler} page={null} />

        </section>
    );
}