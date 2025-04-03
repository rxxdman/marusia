import { useEffect, useState } from "react";
import { fetchMovieId, fetchRandomMovie, movie } from "../API/movie";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../API/queryClient";
import { useLocation, useParams } from "react-router-dom";


/**
Хук фильма
 */
export const useMovie = () => {

    const [movie, setRandomMovie] = useState({} as movie);
    const location = useLocation();
    const [genre, setGenre] = useState("");
    const [times, setTimes] = useState("");
    const [plot, setPlot] = useState("");
    const [status, setStatus] = useState("");
    const [animation, setAnimation] = useState(false);

    function setData(data : movie){
        setRandomMovie(data);
        setGenre(data.genres[0]);
        setTimes(Math.trunc(data.runtime / 60) + " ч " + data.runtime % 60 + " мин");
        setPlot(data.plot.slice(0, data.plot.indexOf('. ')) + ".")
        setTimeout(() => {
            setAnimation(true);
        }, 200);
    }

    //Работа с получением рандомного фильма
    const randomMovieQuery = useQuery(
        {
            queryKey: ["randomMovie"],
            queryFn: fetchRandomMovie,
            enabled: location.pathname == "/",
        },
        queryClient
    );

    useEffect(() => {
        if (randomMovieQuery.data) {
            setData(randomMovieQuery.data);
            setStatus(randomMovieQuery.status);
        }
    }, [randomMovieQuery.data, randomMovieQuery.status]);

    const reload = () => {
        setAnimation(false);
        setTimeout(() => {
            randomMovieQuery.refetch();
        }, 1100);
    }



    //Работа с получением фильма по ID
    const { movieId } = useParams();
    const movieIdQuery = useQuery(
        {
            queryKey: ["movie", movieId],
            queryFn: () => fetchMovieId(Number(movieId)),
            enabled: !!movieId
        },
        queryClient
    );
    useEffect(() => {
        if (movieIdQuery.data) {
            setData(movieIdQuery.data);
            setStatus(movieIdQuery.status);
        }
    }, [movieIdQuery.data, movieIdQuery.status]);

    return { movie, genre, times, plot, reload, status, location, animation };
};