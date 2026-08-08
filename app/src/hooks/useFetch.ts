import { useEffect, useState } from "react";
import type { Method, Movie, Options } from "../types/types";

const BASE_URL = "http://localhost:5000";

export default function useFetch(url: string, initialState: Movie[] | []) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        if (!url) {
            return;
        };

        (async () => {
            const response = await fetch(`${BASE_URL}${url}`);

            if (!response.ok) {
                return {}
            };

            const result = await response.json();

            setData(result);
        })()

    }, [url]);

    async function request<T>(url: string, method: Method, body?: T) {
        const options: Options = { method: method };

        if (body) {
            options.headers = {
                "content-type": "application/json"
            };
            options.body = JSON.stringify(body);
        };


        const response = await fetch(`${BASE_URL}${url}}`, options);

        if (!response.ok) {
            const result = await response.json();
            throw result;
        }

        const result = await response.json();

        setData(result);

        return result
    };

    return { data, setData, request };
};