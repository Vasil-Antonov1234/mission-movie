import type { ValidateValue } from "../types/types";

export function validate(value: ValidateValue) {
    const errors: ValidateValue = {};

    // User validate
    // Email
    if (value.email === "") {
        errors["email"] = "Email is required";
    };

    if (value.email && value.email.length < 10) {
        errors["email"] = "Email must be at least 10 characters long";
    };

    if (value.email && !value.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        errors["email"] = "Invalid email address";
    };

    // Password
    if (value.password === "") {
        errors["password"] = "Password is required";
    };

    if (value.password && value.password !== value.confirmPassword) {
        errors["password"] = "Passwords mismatch";
        errors["confirmPassword"] = "Passwords mismatch";
    };

    if (value.password && value.password.length < 8) {
        errors["password"] = "Password must be at least 8 characters long";
    };

    // Movie validation
    // Title
    if (value.title === "") {
        errors["title"] = "Title is required";
    };

    // Year
    if (value.year === "") {
        errors["year"] = "Year is required";
    };

    if (value.year && value.year.match(/^([0-2]{1}[0-9]{1}|3[0-1]{1})\/(1{1}[0-2]{1}|0{1}[0-9]{1})\/(\d{4})$/)) {
        errors["year"] = "Invalid date format";
    };

    // Rating
    if (value.rating === "") {
        errors["rating"] = "Rating is required";
    };

    if (value.rating && (isNaN(Number(value.rating))) || (Number(value.rating)) < 1 || (Number(value.rating)) > 10) {
        errors["rating"] = "Rating must be an intiger between 1 and 10";
    };

    if (value.rating && !value.rating.match(/^[0-9]{1,2}$/)) {
        errors["rating"] = "Rating must be an intiger between 1 and 10";
    };

    // Genre
    if (value.genre === "") {
        errors["genre"] = "Genre is required";
    };

    // Poster
    if (value.poster === "") {
        errors["poster"] = "Poster is required";
    };

    if (value.poster && !value.poster.match(/^https?:\/\//)) {
        errors["poster"] = "Invalid URL address";
    };

    // Synopsis
    if (value.synopsis === "") {
        errors["synopsis"] = "Synopsis is required";
    };

    // Duration
    if (value.duration === "") {
        errors["duration"] = "Duration is required";
    };

    // TODO regex duration va\lidate

    // Director
    if (value.director === "") {
        errors["director"] = "Director is required";
    };

    if (value.director && value.director.length < 3) {
        errors["director"] = "Director name must be at least 3 characters long";
    };

    // Trailer
    if (value.trailerUrl === "") {
        errors["trailerUrl"] = "Trailer is required";
    };

    if (value.trailerUrl && value.trailerUrl.match(/^https?:\/\//)) {
        errors["trailerUrl"] = "Invalid URL address";
    };

    return errors;
}