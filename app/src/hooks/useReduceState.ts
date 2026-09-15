import { useEffect, useMemo, useReducer } from "react";
import { errorMessageHandler } from "../utils/errorUtil";
import type { Config, Method, Options } from "../types/types";

type R = {
    id: number,
    userId?: number,
    movieId?: number,
    content?: string,
    createdAt?: string,
    updatedAt?: string,
    user?: {
        email: string,
        firstName: string;
        lastName: string;
    },
    movie?: {
        id: number,
        title: string
    }
}

type Type = "GET_ALL" | "ADD" | "REMOVE"

type Action = {
    type: Type,
    payload: R[],
    recordId?: number
};

function stateReducer(state: R[], action: Action): R[] {
    switch (action.type) {
        case "GET_ALL":
            return action.payload;
        case "ADD":
            return [...state, action.payload[0]];
        case "REMOVE":
            return state.filter((x) => x.movieId !== action.recordId);
        default:
            return state;
    }
}
export default function useReduceState<T>(url: string, method: Method = "GET", config: Config = {}, initialState: R[], body?: T) {

    const [data, dispatch] = useReducer(stateReducer, initialState);

    const options = useMemo(() => {
        const options: Options = { method }
    
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
            };
        };

        return options
    }, [method, body, config.accessToken]);
    
    useEffect(() => {
        const controller = new AbortController();
        
        (async () => {
            options.signal = controller.signal
            
            try {
                const response = await fetch(`http://localhost:5000/${url}`, options);

                const result: R[] = await response.json();

                dispatch({
                    type: "GET_ALL",
                    payload: result
                });
            } catch (error) {
                errorMessageHandler(error);
            };
        })()

        return () => {
            controller.abort();
        }
    }, [url, options]);

    return { data, dispatch };
};