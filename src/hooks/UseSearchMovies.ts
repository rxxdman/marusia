import { useParams } from "react-router-dom";
import { queryClient } from "../API/queryClient";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieSearch, movieList } from "../API/movie";
import { useEffect, useState } from "react";

export const UseSearchMovies = () => {

    const [movies, setMovies] = useState([] as movieList)

    const { title } = useParams();

    const movieSearchQuery = useQuery(
        {
            queryKey: ["movieSearch", title],
            queryFn: () => fetchMovieSearch(String(title)),
            enabled: !!title
        },
        queryClient
    );

    useEffect(() => {
        if (movieSearchQuery.data) {
            setMovies(movieSearchQuery.data);
        }

    }, [movieSearchQuery]);

    return { movies };
}