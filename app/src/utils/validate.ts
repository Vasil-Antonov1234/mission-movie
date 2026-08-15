import type { ValidateValue } from "../types/types";

const genres = [
	"Action",
	"Adventure",
	"Animation",
	"Comedy",
	"Crime",
	"Documentary",
	"Drama",
	"Fantasy",
	"Horror",
	"Mystery",
	"Romance",
	"Sci-Fi",
	"Thriller",
	"War",
	"Western",
    "Action-Berets",
    "Superhero",
    "Marvel"
];

function validateGenre(text: string) {
    const tokens = text.split(", ");
    let result = true;

    tokens.forEach((x) => {
        if (!genres.includes(x)) {
            result = false;
        }
    });

    return result
};

const currentYear = new Date().getFullYear();

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

    if (value.confirmPassword === "") {
        errors["confirmPassword"] = "Confirm password is required";
    };

    if (value.password && value.confirmPassword && value.password !== value.confirmPassword) {
        errors["password"] = "Passwords mismatch";
        errors["confirmPassword"] = "Passwords mismatch";
    };

    if (value.password && value.password.length < 8) {
        errors["password"] = "Password must be at least 8 characters long";
    };

    // First name
    if (value.firstName === "") {
        errors["firstName"] = "First name is required";
    };

    if (value.firstName && !value.firstName.match(/^[A-Z]{1}[a-zA-Z]+$/)) {
        errors.firstName = "The first name must start with a capital letter and contain only letters";
    };

    // Last name
    if (value.lastName === "") {
        errors["lastName"] = "First name is required";
    };

    if (value.lastName && !value.lastName.match(/^[A-Z]{1}[a-zA-Z]+$/)) {
        errors.lastName = "The last name must start with a capital letter and contain only letters";
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

    if (value.year && !isNaN(Number(value.year)) && (Number(value.year) < 1888 || Number(value.year) > currentYear + 4)) {
        errors["year"] = `Year must be between 1888 and ${currentYear + 4}`;
    };

    // Rating
    if (value.rating === "") {
        errors["rating"] = "Rating is required";
    };

    if (value.rating && (isNaN(Number(value.rating))) || (Number(value.rating)) < 1 || (Number(value.rating)) > 10) {
        errors["rating"] = "Rating must be an intiger between 1 and 10";
    };

    if (value.rating && !value.rating.match(/^[0-9]\.[0-9]$/)) {
        errors["rating"] = "Rating must be an intiger between 1 and 10";
    };

    // Genre
    if (value.genre === "") {
        errors["genre"] = "Genre is required";
    };

    if (value.genre && !validateGenre(value.genre)) {
        errors["genre"] = "Invalid genre is detected";
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

    if (value.synopsis && value.synopsis.length < 30) {
        errors["synopsis"] = "Synopsis must be at least 30 characters long.";
    };

    // Duration
    if (value.duration === "") {
        errors["duration"] = "Duration is required";
    };

    if (value.duration && !value.duration?.match(/^[0-9]{1,2}h [0-9]{1,2}m$/) && value.duration !== "") {
        errors["duration"] = "Invalid movie duration format";
    };

    // Director
    if (value.director === "") {
        errors["director"] = "Director is required";
    };

    if (value.director && !value.director.match(/^[A-Z]/)) {
        errors["director"] = "The director's name must start with a capital letter";
    };

    if (value.director && value.director.length < 3) {
        errors["director"] = "Director name must be at least 3 characters long";
    };

    // Trailer
    if (value.trailerUrl === "") {
        errors["trailerUrl"] = "Trailer is required";
    };

    if (value.trailerUrl && !value.trailerUrl.match(/^https?:\/\//)) {
        errors["trailerUrl"] = "Invalid URL address";
    };

    // Tagline
    if (value.tagline === "") {
        errors["tagline"] = "Tagline is required";
    };

    // Written by
    if (value.writtenBy === "") {
        errors["writtenBy"] = "A writter name is required";
    };

    if (value.writtenBy && !value.writtenBy.match(/^[A-Z]/)) {
        errors["writtenBy"] = "The writer's name must start with a capital letter";
    }

    if (value.writtenBy && value.writtenBy.length < 5) {
        errors["writtenBy"] = "A writer name must be at least 5 characters long";
    };

    // Studio
    if (value.studio === "") {
        errors["studio"] = "Studio name is required";
    };

    // Release date
    if (value.releaseDate === "") {
        errors["releaseDate"] = "Release date is required";
    };

    if (value.releaseDate && !value.releaseDate.match(/^([A-Z]{1}[a-z]{1,9}) ([1-2][0-9]|3[0-1]|[1-9])$/)) {
        errors["releaseDate"] = "Invalid date format";
    };

    // Language
    if (value.language === "") {
        errors["language"] = "Language is required";
    };

    if (value.language && value.language.length < 5) {
        errors["language"] = "Language must be at least 5 characters";
    };

    // Country
    if (value.country === "") {
        errors["country"] = "Country is required";
    };

    if (value.country && value.country.length < 2) {
        errors["country"] = "Country must be at least 2 characters";
    };

    // Budget
    if (value.budget === "") {
        errors["budget"] = "Budget is required";
    };

    if (value.budget && !value.budget.match(/^\$\d{1,3} ?\d{0,3} ?\d{0,3}M?$/)) {
        errors["budget"] = "Invalid budget data";
    };

    // Box office
    if (value.boxOffice === "") {
        errors["boxOffice"] = "Box office amount is required";
    };

    if (value.boxOffice && !value.boxOffice.match(/^\$\d{1,3} ?\d{0,3} ?\d{0,3}M?$/)) {
        errors["boxOffice"] = "Invalid box office amount data";
    };

    return errors;
}