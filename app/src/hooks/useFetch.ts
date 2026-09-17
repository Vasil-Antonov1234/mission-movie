import { useContext, useEffect, useState } from "react";
import type { Config, Method, Options } from "../types/types";
import { errorMessageHandler } from "../utils/errorUtil";
import UserContext from "../contexts/UserContext";

const BASE_URL = "http://localhost:5000";

export default function useFetch<T>(url?: string, initialState?: T) {
    const [data, setData] = useState(initialState);
    const { onLogout } = useContext(UserContext);

    useEffect(() => {
        if (!url) {
            return;
        };

        const controller = new AbortController();


        (async () => {
            try {
                const response = await fetch(`${BASE_URL}${url}`, { signal: controller.signal });

                if (!response.ok) {
                    if (response.status === 401) {
                        onLogout("/login");
                    }
                    return {};
                };

                const result = await response.json();

                setData(result);
            } catch (error) {
                if(errorMessageHandler(error) === "Invalid token") {
                    onLogout("/login")
                }
            };
        })()

        return () => {
            controller.abort();
        }

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

        const response = await fetch(`${BASE_URL}${url}`, options);

        if (!response.ok) {
            const result = await response.json();
            throw result;
        }

        const result = await response.json();

        return result;

    };

    return { data, setData, request, BASE_URL };
};