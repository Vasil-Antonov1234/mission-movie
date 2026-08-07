import { useEffect, useState } from "react";

export default function useFetch(url: string) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) {
            return;
        };

        (async () => {
            const response = await fetch(`http://localhost:5000/${url}`);

            if (!response.ok) {
                return {}
            };

            const result = await response.json();

            setData(result);
        })()

    }, [url]);

    return { data, setData };
};