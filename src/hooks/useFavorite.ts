import { useMutation, useQuery } from "@tanstack/react-query";
import { addFavoriteMovies, deleteFavoriteMovies } from "../API/users";
import { queryClient } from "../API/queryClient";
import { useEffect, useState } from "react";

import FavoriteIco from "../assets/favorite.svg?url";
import FavoriteOnIco from "../assets/favoriteOn.svg?url";
import { fetchFavoriteMovies } from "../API/movie";

export const useFavorite = (id: number) => {

    const [favoriteIco, setFavoriteIco] = useState(FavoriteIco);
    const [favoriteCheck, setFavoriteCheck] = useState(false);
    const [DeleteCheck, setDeleteCheck] = useState(false);

    const FavoriteMovieQuery = useQuery(
        {
            queryKey: ["favoriteMovie"],
            queryFn: fetchFavoriteMovies,
            enabled: location.pathname == "/account",
        },
        queryClient
    );

    useEffect(() => {
        if (FavoriteMovieQuery.data) {
            if (FavoriteMovieQuery.data.find((item) => item.id === id)) {
                setFavoriteIco(FavoriteOnIco);
                setFavoriteCheck(true)
            }
            else {
                setFavoriteIco(FavoriteIco);
                setFavoriteCheck(false)
            }
        }

    }, [FavoriteMovieQuery.data, id])

    const addFavorite = useMutation({
        mutationFn: () => addFavoriteMovies(id.toString()),
    }, queryClient)

    const deleteFavorite = useQuery(
        {
            queryKey: ["DeleteFavorite"],
            queryFn: async () => {
                await deleteFavoriteMovies(id.toString())
                queryClient.invalidateQueries({ queryKey: ["favorites"] })
            },
            enabled: DeleteCheck === true,

        },
        queryClient
    );

    /**
Удалить фильм из избранных*/
    const deleteFavoriteClick = () => {
        setFavoriteIco(FavoriteIco);
        setFavoriteCheck(false)
        setDeleteCheck(true);
        deleteFavorite.refetch();
        setDeleteCheck(false);
    }

    const favoriteButtonClick = () => {
        if (favoriteCheck) {
            deleteFavoriteClick();
        }
        else {
            addFavorite.mutate();
            setFavoriteIco(FavoriteOnIco);
            setFavoriteCheck(true)
        }

    }



    return { favoriteIco, favoriteButtonClick, deleteFavoriteClick }
}