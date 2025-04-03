import { z } from 'zod'

export const movieSchema = z.object({
    id: z.number(),
    title: z.string(),
    originalTitle: z.string(),
    language: z.string(),
    releaseYear: z.number(),
    releaseDate: z.string(),
    genres: z.array(z.string()),
    plot: z.string(),
    runtime: z.number(),
    budget: z.string(),
    revenue: z.string(),
    homepage: z.string(),
    status: z.string(),
    posterUrl: z.string(),
    backdropUrl: z.string(),
    trailerUrl: z.string(),
    trailerYoutubeId: z.string(),
    tmdbRating: z.number(),
    searchL: z.string(),
    keywords: z.array(z.string()),
    countriesOfOrigin: z.array(z.string()),
    languages: z.array(z.string()),
    cast: z.array(z.string()),
    director: z.string(),
    production: z.string(),
    awardsSummary: z.string()
})

export type movie = z.infer<typeof movieSchema>;

export const movieList = z.array(movieSchema);

export type movieList = z.infer<typeof movieList>;

const API_URL = 'https://cinemaguide.skillbox.cc';

export type MovieResponse = z.infer<typeof movieSchema>;
export type MoviesListResponse = movieList;

/**
Запрос - Получение рандомного фильма*/
export function fetchRandomMovie(): Promise<MovieResponse> {
    return fetch(`${API_URL}/movie/random`)
        .then((response) => response.json());
}


/**
Запрос - Получение топ 10 фильмов*/
export function fetchTopTenMovies(): Promise<MoviesListResponse> {
    return fetch(`${API_URL}/movie/top10`)
        .then((response) => response.json());
}

/**
Запрос - Получение фильма по ID*/
export function fetchMovieId(modieId: number): Promise<MovieResponse> {
    return fetch(`${API_URL}/movie/${modieId}`)
        .then((response) => response.json());
}

/**
Запрос - Получение фильмов для поиска*/
export function fetchMovieSearch(title: string): Promise<MoviesListResponse> {
    const params = new URLSearchParams({ count: "5", title: `${title}` }).toString();
    return fetch(`${API_URL}/movie?${params}`)
        .then((response) => response.json());
}

/**
Запрос - Получение фильмов по жанру*/
export function fetchMovieGenres(count: number, page: number, genre: string): Promise<MoviesListResponse> {
    const params = new URLSearchParams({ count: `${count}`, page: `${page}`, genre: `${genre}` }).toString();
    return fetch(`${API_URL}/movie?${params}`)
        .then((response) => response.json());
}

/**
Запрос - Получение избранных фильмов*/
export function fetchFavoriteMovies(): Promise<MoviesListResponse> {
    return fetch(`${API_URL}/favorites`, {
        credentials: "include"
    })
        .then((response) => response.json());
}
