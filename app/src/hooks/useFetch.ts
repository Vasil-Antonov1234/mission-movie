import { useContext, useEffect, useMemo, useState } from "react";
import type { Config, Method, Options } from "../types/types";
import { errorMessageHandler } from "../utils/errorUtil";
import UserContext from "../contexts/UserContext";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export default function useFetch<T>(url?: string, initialState?: T, config: Config = {}) {
    const [data, setData] = useState(initialState);
    const { onLogout } = useContext(UserContext);
    const [isPending, setIsPending] = useState(false);

    const options = useMemo(() => {
        const options: Options = { method: "GET" }

        if (config.accessToken) {
            options.headers = {
                ...options.headers,
                "authorization": config.accessToken
            };
        };

        return options
    }, [config.accessToken]);

    useEffect(() => {
        if (!url) {
            return;
        };

        setIsPending(true);

        const controller = new AbortController();


        (async () => {
            try {
                options.signal = controller.signal

                const response = await fetch(`${BASE_URL}${url}`, options);

                if (!response.ok) {
                    if (response.status === 401) {
                        onLogout("/login");
                    }
                    return {};
                };

                const result = await response.json();

                setData(result);
                // setIsPending(false)
            } catch (error) {
                if (errorMessageHandler(error) === "Invalid token") {
                    onLogout("/login")
                }
            } finally {
                setIsPending(false);
            };
        })()

        return () => {
            controller.abort();
        }

    }, [url, onLogout, options]);

    async function request<T>(url: string, method: Method, config: Config = {}, body?: T) {
        const options: Options = { method: method };
        setIsPending(true);

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

        setIsPending(false);
        return result;

    };

    return { data, setData, request, BASE_URL, isPending };
};