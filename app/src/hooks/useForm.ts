import { useEffect, useState } from "react";
import type { ReviewFormData } from "../types/types";
import useFetch from "./useFetch";

// const baseUrl = "https://mission-movie.onrender.com";
// const baseUrl = "http://localhost:5000";

type Review = {
    review: string,
    movieId: string,
    directorScore: string,
    performanceScore: string,
    screenplayScore: string,
    cinematographyScore: string
};

export default function useForm<T extends Record<string, string | number | boolean | undefined>>(initialValues: T, movieId?: string, castId?: string, reviewId?: string) {
    const [data, setData] = useState<T>(initialValues);
    const [currentData, setCurrentData] = useState<T | null>(null);
    const { BASE_URL } = useFetch();

    useEffect(() => {

        if (!movieId && !castId && !reviewId) {
            setCurrentData(null);
            setData(initialValues);
            return;
        };

        const controller = new AbortController();

        (async () => {

            if (movieId) {
                const response = await fetch(`${BASE_URL}/movies/${movieId}`, { signal: controller.signal });

                const result = await response.json();
                setData(result as T);
                setCurrentData(result as T | null);
            };

            if (castId) {
                const response = await fetch(`${BASE_URL}/casts/${castId}`, { signal: controller.signal });

                const result = await response.json();
                setData(result as T);
                setCurrentData(result as T | null);
            };

            if (reviewId) {
                const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, { signal: controller.signal });

                const result: Review = await response.json();

                const reviewData: ReviewFormData = {
                    content: result.review,
                    movieId: result.movieId,
                    directorScore: result.directorScore,
                    performanceScore: result.performanceScore,
                    screenplayScore: result.screenplayScore,
                    cinematographyScore: result.cinematographyScore
                };

                setData(reviewData as unknown as T);
            };
        })()

        return () => {
            controller.abort();
        };

    }, [initialValues, movieId, castId, reviewId, BASE_URL]);

    function changeHandler(event: React.BaseSyntheticEvent) {

        setData((state) => ({
            ...state,
            [event.target.name]: event.target.type === "checkbox" ? Boolean(event.target.checked) : String(event.target.value)
        }) as T);
    };

    function formInputRegister(name: keyof T) {

        // For type checkbox
        if (typeof data[name] === "boolean") {
            return {
                name,
                checked: data[name],
                onChange: changeHandler
            }
        }

        // For type text/select/textarea input
        return {
            name,
            value: data[name],
            onChange: changeHandler
        }
    }

    function registerTextInput(name: keyof T) {
        return {
            name,
            value: String(data[name] ?? ""),
            onChange: changeHandler
        } as const;
    };

    function registerChecboxInput(name: keyof T) {
        return {
            name,
            checked: Boolean(data[name]),
            onChange: changeHandler
        } as const;
    };


    return {
        changeHandler,
        formInputRegister,
        registerTextInput,
        registerChecboxInput,
        data,
        setData,
        currentData
    };
}   