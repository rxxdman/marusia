import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../API/queryClient";
import { fetchGenresList } from "../API/genres";
import { useEffect, useState } from "react";

export const useGenres = () => {

    const [genres, setGenresList] = useState([] as string[]);

    const genresListQuery = useQuery(
        {
            queryKey: ["GenresList"],
            queryFn: fetchGenresList,
        },
        queryClient
    );


    useEffect(() => {
        if (genresListQuery.data)
            setGenresList(genresListQuery.data);
    }, [genresListQuery.data])




    return { genres}

}