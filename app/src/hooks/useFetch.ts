import { useEffect, useState } from "react";
import type { Movie } from "../types/types";

export default function useFetch(url: string, initialState: Movie[] | []) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        if (!url) {
            return;
        };

        (async () => {
            const response = await fetch(`http://localhost:5000${url}`);

            if (!response.ok) {
                return {}
            };

            const result = await response.json();

            setData(result);
        })()

    }, [url]);

    return { data, setData };
};