import { useEffect, useState } from "react";
import type { Config, Method, Movie, Options } from "../types/types";

const BASE_URL = "http://localhost:5000";

export default function useFetch(url?: string, initialState?: Movie[] | [] | Movie, edit?: boolean) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        if (!url || !edit) {
            return;
        };

        (async () => {
            try {
                const response = await fetch(`${BASE_URL}${url}`);

                if (!response.ok) {
                    return {}
                };

                const result = await response.json();

                setData(result);
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message)
                } else {
                    alert("An unexpected error occurr");
                };
            }
        })()

    }, [url]);

    async function request<T>(url: string, method: Method, config: Config = {}, body?: T) {
        const options: Options = { method: method };

        if (body) {
            options.headers = {
                "content-type": "application/json"
            };
            options.body = JSON.stringify(body);
        };

        if (config.accessToken) {
            options.headers = {
                ...options.headers,
                "authorization": config.accessToken
            }
        }

        try {
            const response = await fetch(`${BASE_URL}${url}`, options);
    
    
            if (!response.ok) {
                const result = await response.json();
                throw result;
            }
    
            const result = await response.json();
    
            // setData(result);
    
            return result;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("An unexpected error occurr");
            };
        }

    };

    return { data, setData, request };
};