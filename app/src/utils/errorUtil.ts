export function errorMessageHandler<T>(error: T) {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof(error) === "string") {
        return error;
    } else {
        return "An unexpected error occurred";
    };
}