
import { z } from 'zod'

export const UserShchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    favorites: z.array(z.string()),
})

export type User = z.infer<typeof UserShchema>;

export const SuccessfulResultShchema = z.object({
    result: z.boolean()
})

export type SuccessfulResult = z.infer<typeof SuccessfulResultShchema>;


//-----------------------------------------------------//

const API_URL = 'https://cinemaguide.skillbox.cc';

/**
Регистрация пользователя
 */
export function registerUser(email: string, password: string, name: string, surname: string): Promise<void> {
    return fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ email, password, name, surname }),
            credentials: "include"
    })
        .then(() => undefined);
}

/**
Авторизация пользователя
 */
export function loginUser(email: string, password: string): Promise<SuccessfulResult> {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка авторизации');
        }
        return response.json();
    })
    .then((data) => SuccessfulResultShchema.parse(data));
}

/**
Получение авторизации пользователя
 */
export function profileUser(): Promise<User> {
    return fetch(`${API_URL}/profile`, {
         credentials: "include"
    })
        .then((response) => response.json()
            .then((data) => UserShchema.parse(data)));
}

/**
Выход пользователя
 */
export function logoutUser(): Promise<void> {
    return fetch(`${API_URL}/auth/logout`, {
            credentials: "include"
    })
        .then((response) => response.json());
}

/**
Запрос - Добавление в избранные*/
export function addFavoriteMovies(movieId: string): Promise<void> {
    return fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: {
           "content-type": "application/x-www-form-urlencoded",
        },
        body: "id="+movieId,
        credentials: "include"
    })
    .then((response) => response.json())
}

/**
Запрос - Удаление избранного*/
export function deleteFavoriteMovies(modieId: string): Promise<void> {
    return fetch(`${API_URL}/favorites/${modieId}`, {
        method: "DELETE",
        credentials: "include"
    })
        .then(() => undefined);
}