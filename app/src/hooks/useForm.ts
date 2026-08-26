import { useEffect, useState, type ChangeEvent } from "react";
// import type { Movie } from "../types/types";

const baseUrl = "http://localhost:5000";

export default function useForm<T>(initialValues: T, movieId?: string, castId?: string) {
    const [data, setData] = useState(initialValues);
    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {

        if (!movieId && !castId) {
            setCurrentData(null);
            setData(initialValues);
            return;
        };

        const controller = new AbortController();
        
        (async () => {
           
            if (movieId) {
                const response = await fetch(`${baseUrl}/movies/${movieId}`, { signal: controller.signal });
                
                const result = await response.json();
                setData(result);
                setCurrentData(result);
            };

            if (castId) {
                const response = await fetch(`${baseUrl}/casts/${castId}`);

                const result = await response.json();
                setData(result);
                setCurrentData(result);
            };
        })()

        return () => {
            controller.abort();
        };

    }, [initialValues, movieId, castId]);

    function changeHandler(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        setData((state) => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    function formInputRegister(name: keyof T) {
        return {
            name,
            value: data[name],
            onChange: changeHandler
        }
    }
    return { changeHandler, formInputRegister, data, setData, currentData }
}