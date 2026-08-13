import { useState } from "react";
import type { User } from "../types/types";

export function usePersistedState(initialValues: User, key = "auth") {
    const [state, setState] = useState(() => {
        const data = localStorage.getItem(key);

        if (data) {
            return JSON.parse(data);
        };

        return initialValues;
    });

    function setPersistedState(input: User | ((value: User) => void)) {

        if (typeof input === "function") {
            setState(input(state));
            localStorage.setItem(key, JSON.stringify(input(state)));

            return
        };

        localStorage.setItem(key, JSON.stringify(input));
        setState(input);
    };

    return [state, setPersistedState];
}
