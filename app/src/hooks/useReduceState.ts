import { useEffect, useReducer } from "react";
import { errorMessageHandler } from "../utils/errorUtil";

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
    }
}

type Action = {
    type: string,
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
            return state.filter((x) => x.id !== action.payload[0].id);
        default:
            return state;
    }
}

export default function useReduceState(url: string, initialState: R[]) {

    const [data, dispatch] = useReducer(stateReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {

            try {
                const response = await fetch(`http://localhost:5000/${url}`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json"
                        },
                        signal: controller.signal
                    }
                );

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
    }, [url]);

    return { data, dispatch };
};