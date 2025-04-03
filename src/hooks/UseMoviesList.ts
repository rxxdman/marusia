import { useEffect, useState } from "react";
import { fetchFavoriteMovies, fetchMovieGenres, fetchTopTenMovies, movieList } from "../API/movie";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../API/queryClient";
import { useParams} from "react-router-dom";


export const useMoviesList = (initialMovies = []) => {

    const params = useParams();

    const [animation, setAnimation] = useState(false);

    const [movies, setMovies] = useState(initialMovies as movieList)
    const [status, setStatus] = useState("");
    const [errors, setError] = useState("");

    /**
топ 10 фильмов
*/

    const topTenMoviesQuery = useQuery(
        {
            queryKey: ["TopMovies"],
            queryFn: fetchTopTenMovies,
            enabled: location.pathname == "/",
        },
        queryClient
    );

    useEffect(() => {
        if (topTenMoviesQuery.data && location.pathname === "/") {
            setMovies(topTenMoviesQuery.data);
            setAnimation(true);
            setStatus(topTenMoviesQuery.status);
            setError(String(topTenMoviesQuery.error?.message))
        }
    }, [topTenMoviesQuery]);





    /**
 Фильмы по жанру
 */

    const initialMoviesCount = 10; // Количество фильмов для начальной загрузки
    // const additionalMoviesCount = 10; // Количество дополнительных фильмов на загрузку
    
    const [moviesCount, setMoviesCount] = useState(initialMoviesCount)
    const [moviesPage, setMoviesPage] = useState(0);
    const [hasMoreMovies, setHasMoreMovies] = useState(true);

    const moviesGenresQuery = useQuery(
        {
            queryKey: ["MoviesGenres", moviesCount, moviesPage, params.genres],
            queryFn: () => fetchMovieGenres(moviesCount, moviesPage, String(params.genres)),
            enabled: !!params.genres,
        },
        queryClient
    );

    const onClickNextMovies = () => {
        setMoviesPage((prevPage) => ++prevPage)
    }

    useEffect(() => {
        if (moviesGenresQuery.data && moviesGenresQuery.data.length > 0) {       
            setMovies((prevMovies) => [...prevMovies, ...moviesGenresQuery.data]);
            setAnimation(true);
            setStatus(moviesGenresQuery.status);
            setError(String(moviesGenresQuery.error?.message));
            setHasMoreMovies(moviesGenresQuery.data.length === moviesCount); // Проверяем, есть ли ещё фильмы
        }
        else {
            setHasMoreMovies(false);
        }
    }, [moviesCount, moviesGenresQuery.data, moviesGenresQuery.error?.message, moviesGenresQuery.status]);

    useEffect(() => {
        if (params.genres) {
           
            setMoviesCount(initialMoviesCount); // Сбрасываем до начального количества фильмов
            setMoviesPage(0); // Сбрасываем текущую страницу 
            if (moviesGenresQuery.data && moviesGenresQuery.data.length > 0)
            setMovies(moviesGenresQuery.data);
        }
    }, [params.genres]);



   /**
 Фильмы избранные
 */
    const FavoriteMovieQuery = useQuery(
        {
            queryKey: ["favorites"],
            queryFn: fetchFavoriteMovies,
            enabled: location.pathname == "/account",
        },
        queryClient
    );

    useEffect(() => {
        if (FavoriteMovieQuery.data && location.pathname === "/account") {
            setMovies(FavoriteMovieQuery.data);
            setAnimation(true);
            setStatus(FavoriteMovieQuery.status);
            setError(String(FavoriteMovieQuery.error?.message))
        }
    }, [FavoriteMovieQuery]);

    return { movies, onClickNextMovies, hasMoreMovies, params, status, errors, animation };
};