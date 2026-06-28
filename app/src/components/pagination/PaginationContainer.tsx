import { useState } from "react";
import PaginationButton from "./PaginationButton";
import styles from "./PaginationContainer.module.css";

type PaginationContainerProps = { count: number[] | string, onPageNumber(page: number | string): void }


export default function PaginationContainer(props: PaginationContainerProps) {
    const [activePage, setActivePage] = useState(1);

    function activePageHandler(page: number | string) {

        if (typeof (page) === "number") {
            setActivePage(page)
        }

        props.onPageNumber(page)

    };

    function previewsPageHandler() {
        setActivePage((state) => state - 1)
    };

    function nextPageHandler() {
        setActivePage((state) => state + 1);
    };

    return (
        <section className={styles["pages-container"]}>
            <div className={activePage > 1 ? `${styles["previous-next-page"]} ${styles["show-prev-next-page"]}` : styles["previous-next-page"]}>
                <PaginationButton count={"<"} onPageChange={previewsPageHandler} page={null} />
            </div>
            {typeof (props.count) !== "string" ? props.count.map((button) => <PaginationButton key={button} count={button} onPageChange={activePageHandler} page={activePage} />) : ""}
            <div className={activePage < props.count.length ? `${styles["previous-next-page"]} ${styles["show-prev-next-page"]}` : styles["previous-next-page"]}>
                <PaginationButton count={">"} onPageChange={nextPageHandler} page={null} />
            </div>
        </section>
    );
}