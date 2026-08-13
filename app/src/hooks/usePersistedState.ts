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

    function setPersistedState(value: User) {

        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };

    return [state, setPersistedState];
}
