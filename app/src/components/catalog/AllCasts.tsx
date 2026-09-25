import { Activity, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import type { CastSmall } from "../../types/types";
import CastCardSmall from "../cast/CastCardSmall";
import styles from "./AllCasts.module.css"
import UserContext from "../../contexts/UserContext";

export default function AllCasts() {
    const { user } = useContext(UserContext);
    const { data } = useFetch<CastSmall[]>("/casts/get/all", [], { accessToken: user.accessToken });

    return (
        <section className={styles["trending-section"]}>
            <div>
                <h1 className={styles["section-heading-title"]}>Cast managment</h1>
            </div>
            <section className={styles["trending-wrapper"]}>
                <div className={styles["trending-container"]}>
                    {data?.map((x) => <CastCardSmall
                        key={x.id}
                        id={x.id}
                        firstName={x.firstName}
                        lastName={x.lastName}
                        imageUrl={x.imageUrl}
                    />)}
                </div>
            </section>
            <Activity mode={data?.length === 0 ? "visible" : "hidden"}>
                <section className={styles["trending-wrapper"]}>
                    <h2 className={styles["no-cast"]}>Nothing here yet</h2>
                </section>
            </Activity>
        </section>
    );
}