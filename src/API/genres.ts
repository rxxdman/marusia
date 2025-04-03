import { z } from 'zod'
import { movieList } from './movie';

export const genresSchema = z.array(z.string());

export type genresList = z.infer<typeof genresSchema>;

const API_URL = 'https://cinemaguide.skillbox.cc';

/**
Запрос - Получение списка жанров*/
export function fetchGenresList(): Promise<genresList> {
    return fetch(`${API_URL}/movie/genres`)
        .then((response) => response.json());
}

/**
Запрос - Получение фильма для жанра*/
export function fetchGenresImage(genre: string): Promise<movieList> {
    const params = new URLSearchParams({ count: "4", genre: `${genre}` }).toString();
    return fetch(`${API_URL}/movie?${params}`)
        .then((response) => response.json());
}