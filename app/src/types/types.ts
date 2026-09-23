export type Featured = {
    id: number,
    title: string,
    year: number,
    genre: string,
    rating: string,
    description: string,
    poster: string,
    director: string,
    duration: string
    trailerUrl?: string,
};

export type Rating = { rating?: string };

export type Like = {
    userId: string
}

export type Review = {
    cinematographyScore: string,
    createdAt: string,
    directorScore: string,
    movieId: string,
    performanceScore: string,
    review: string,
    screenplayScore: string,
    userId: string,
    id: string,
    likes: Like[]
    user: {
        id: string,
        email: string,
        firstName: string,
        lastName: string
    }
    movie: {
        id: string,
        poster: string,
        title: string,
        year?: string,
        rating? :string,
        genre? :string,
        duration?: string,
        director?: string
    }
};

export type ReviewSmall = {
    id: string,
    review: string,
    user: {
        firstName: string,
        lastName: string,
    },
    createdAt: string
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
    year?: string,
    rating?: string,
    totalRating?: string,
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
    authorId?: string,
    tagline?: string,
    writtenBy?: string,
    studio?: string,
    releaseDate?: string,
    language?: string,
    country?: string,
    budget?: string,
    boxOffice?: string,
    casts?: Artist[]
    reviewsCount?: number,
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

export type CommentData = {
    id: number,
    userId?: number,
    movieId?: number,
    content?: string,
    createdAt?: string
    updatedAt?: string
    user?: {
        email: string,
        firstName: string,
        lastName: string
    }
}

export type Cast = {
    castId: number,
    movieId: number,
    nameInMovie: string,
    cast: Artist
};

export type Actor = {
    id: number,
    firstName: string,
    lastName: string,
    bornDate?: string
    placeOfBorn?: string
    imageUrl?: string,
    createdAt?: string,
    updatedAt?: string,
    awards?: string,
    biography?: string,
    imdbProfile?: string,
    wikipedia?: string,
    authorId?: string
}

export type Artist = {
    cast: Actor,
    castId: string,
    movieId: string,
    nameInMovie: string
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
    body?: string,
    signal?: AbortSignal | null | undefined
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
    imageUrl?: string,
    cast?: string,
    nameInMovie?: string,
    imdbProfile?: string,
    wikipedia?: string,
    biography?: string,
    awards?: string,
    currentPassword?: string,
    content?: string,
    directorScore?: string,
    performanceScore?: string,
    screenplayScore?: string,
    cinematographyScore?: string,
    movieId?: string
};

export type UserCtx = {
    user: {
        id?: number,
        accessToken?: string,
        firstName?: string,
        lastName?: string,
        email?: string,
        isGoogleUser?: boolean,
        createdAt?: string
    }
    onLogin: (user: User) => void,
    onLogout: (navigateTo?: string) => void,
    isAuthenticated: boolean,
    onUpdateCtxUser: (user: User) => void
};

export type User = {
    id?: number,
    accessToken?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    isGoogleUser?: boolean,
    createdAt?: string
};

export type Config = {
    accessToken?: string
};