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

export type Method = "GET" | "POST" | "PUT" | "PATCH";

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
    trailerUrl?: string
};

export type UserCtx = {
    user: {
        id?: number,
        accessToken?: "",
        firstName?: "",
        lastName?: "",
        email?: "",
    }
    onLogin: (user: User) => void,
    onLogout: () => void,
    isAuthenticated: boolean
};

export type User = {
    id?: number,
    accessToken?: "",
    firstName?: "",
    lastName?: "",
    email?: "",
    password?: "",
    confirmPassword?: ""
};

export type Config = {
    accessToken?: string
}