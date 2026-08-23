import { useEffect, useState, type ChangeEvent } from "react";

export default function useForm<T extends Record<string, string>>(initialValues: T, movieId?: string) {
    const [data, setData] = useState(initialValues);
    const [currentMovie, setCurrentMovie] = useState(null);

    useEffect(() => {

        if (!movieId) {
            setCurrentMovie(null);
            setData(initialValues);
            return;
        };

        const controller = new AbortController();
        
        (async () => {

            const response = await fetch(`http://localhost:5000/movies/${movieId}`, { signal: controller.signal });
            const result = await response.json();

            setData(result);
            setCurrentMovie(result);
        })()

        return () => {
            controller.abort();
        };

    }, [initialValues, movieId]);

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
    return { changeHandler, formInputRegister, data, setData, currentMovie }
}