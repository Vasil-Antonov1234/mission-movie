export type Featured = {
    title: string,
    year: number,
    genre: string[],
    rating: number,
    description: string,
    backdrop: string,
    director: string,
    duration: string
};

export type Rating = { rating: number };

export type Review = {
    id: number,
    title: string,
    rating: number,
    excerpt: string,
    author: string,
    date: string,
    poster: string
};

export type Movie = {
    id: number,
    title: string,
    year: number,
    rating: number,
    genre: string,
    poster: string,
    position: number
};