import { Activity, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import type { CastSmall } from "../../types/types";
import CastCardSmall from "../cast/CastCardSmall";
import styles from "./AllCasts.module.css"
import theme from "../Theme.module.css";
import UserContext from "../../contexts/UserContext";
import usePageTitle from "../../hooks/usePageTitle";
import CinematicLoader from "../countdown-spinner/CinematicLoader";

export default function AllCasts() {
    const { user, isDarkTheme } = useContext(UserContext);
    const { data, isPending } = useFetch<CastSmall[]>("/casts/get/all", [], { accessToken: user.accessToken });
    usePageTitle("Actors")

    return (
        <section className={`${styles["trending-section"]} ${!isDarkTheme ? theme["white-theme"] : ""}`}>
            <CinematicLoader startFrom={5} pending={isPending} />
            <div>
                <h1 className={`${styles["section-heading-title"]} ${!isDarkTheme ? theme["pageEyebrow"] : ""}`}>Cast managment</h1>
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