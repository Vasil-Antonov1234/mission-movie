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
    rating: number,
    genre: string,
    poster: string,
    position?: number
    synopsis?: string,
    duration?: string,
    director?: string,
    trailerUrl?: string,
    createdAt?: string,
    updatedAt?: string,
    author?: Author,
    tagline?: string,
    writtenBy?: string,
    studio?: string,
    releaseDate?: string,
    language?: string,
    country?: string,
    budget?: string,
    boxOffice?: string
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

export type Artist = {
    id: number,
    firstName: string,
    lastName: string,
    bornDate?: string
    placeOfBorn?: string
    imageUrl?: string
};

export type ButtonProps = {
    text: string,
    addStyle?: string,
    clickHandler?: () => void
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
};

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type LoginBody = {
    email: string,
    password: string
};

export type RegisterBody = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
};

export type Options = {
    method: Method,
    headers?: {
        "content-type"?: string,
        "X-admin"?: string,
        "authorization"?: string
    },
    body?: string
};

export type ValidateValue = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    title?: string,
    year?: string,
    rating?: string,
    genre?: string,
    poster?: string,
    synopsis?: string,
    duration?: string,
    director?: string,
    trailerUrl?: string,
    writtenBy?: string,
    tagline?: string,
    studio?: string,
    releaseDate?: string,
    language?: string,
    country?: string,
    budget?: string,
    boxOffice?: string,
    bornDate?: string,
    placeOfBorn?: string,
    imageUrl?: string
};

export type UserCtx = {
    user: {
        id?: number,
        accessToken?: string,
        firstName?: string,
        lastName?: string,
        email?: string
    }
    onLogin: (user: User) => void,
    onLogout: (navigateTo?: string) => void,
    isAuthenticated: boolean
};

export type User = {
    id?: number,
    accessToken?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
};

export type Config = {
    accessToken?: string
}