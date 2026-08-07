export type Featured = {
    id: number,
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

export type Author = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

export type Movie = {
    id?: number,
    title: string,
    year?: number,
    rating?: number,
    genre: string,
    poster: string,
    position?: number
    synopsis?: string,
    duration?: string,
    director?: string,
    trailerUrl?: string,
    createdAt?: string,
    updatedAt?: string,
    author?: Author
};

export type SelectionOptions = { 
        options: string[], 
        setSortBy: (sortBy: string) => void,
        activeState: string
    };

export type CommentType = {
    id: number,
    author: string,
    date: string,
    rating: number,
    text: string
};

export type Cast = {
    person: {
        id: number,
        name: string,
        role: string,
        photo: string
    }
};

export type ButtonProps = {
    text: string,
    addStyle?: string
};

export type SimilarFilm = {
    id: number,
    title: string,
    year: number,
    rating: number,
    poster: string
};

export type Trending = {
    trending: Movie[]
}