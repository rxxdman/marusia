import { FC, useEffect, useState } from "react"
import "./style/GenresList.css"
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../API/queryClient";
import { fetchGenresImage } from "../../API/genres";
import { movieList } from "../../API/movie";
import { translateGenre } from "../../function/TranslateGenre";

interface genreProps {
    genre: string
    movieList: movieList
}


export const Genre: FC<genreProps> = ({ genre, movieList }) => {

    const [Background, setBackground] = useState('');

    const genresImageQuery = useQuery(
        {
            queryKey: ["GenresImage", genre],
            queryFn: () => fetchGenresImage(String(genre)),
            enabled: !!genre
        },
        queryClient
    );

    useEffect(() => {
        if (genresImageQuery.data)
            for (let index = 0; index < genresImageQuery.data.length; index++) {
                if (movieList.find(item => item.id == genresImageQuery.data[index].id) === undefined){
                    setBackground(genresImageQuery.data[index].posterUrl);
                    movieList.push(genresImageQuery.data[index])
                    return;
                }
            }

    }, [genresImageQuery.data, movieList])

    return (<article className="genresCard" style={{ backgroundImage: `url("${Background}")` }}>
        <p className="genresCard__title">{translateGenre(String(genre))}</p>
    </article>
    )
}