export function errorMessageHandler<T>(error: T) {
    let message = "An unexpected error occurred";

    if ((error instanceof DOMException || error instanceof Error) && error.name === "AbortError") {
        return;
    };

    if (error instanceof Error) {
        message = error.message;
    }

    if (typeof (error) === "string") {
        message = error;
    };

    if (message === "Invalid token") {
        return message;
    };
    
    alert(message);
};