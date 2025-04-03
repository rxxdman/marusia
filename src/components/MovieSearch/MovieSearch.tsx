import { Link } from "react-router-dom"
import "./style/MovieSearch.css"
import { MovieSearchElement } from "./MovieSearchElement"
import { FC, useCallback, useEffect, useState } from "react";
import { queryClient } from "../../API/queryClient";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieSearch } from "../../API/movie";

interface movieSearchProps {
    closeModal?(): void;
}

export const MovieSearch: FC<movieSearchProps> = ({ closeModal }) => {

    const [search, setSearch] = useState('');
    const [searchListVis, setListVisible] = useState(false);

    const movieSearchQuery = useQuery(
        {
            queryKey: ["movieSearch", search],
            queryFn: () => fetchMovieSearch(String(search)),
            enabled: !!search
        },
        queryClient
    );

    const onChange = (event: { target: { value: string; }; }) => {
        setSearch(event.target.value);
    }

    const onBlur = () => {
        setListVisible(false)
    }

    const onfocus = useCallback(() => {
        if (search.length > 0)
            setListVisible(true)
        else
            setListVisible(false)
    }, [search.length]);

    useEffect(() => {
        onfocus();
    }, [onfocus])

    const onClickLing = () => {
        setListVisible(false);
        if (closeModal)
            closeModal();
    }


    return (<div onFocus={onfocus} onBlur={onBlur} className="movieSearch">

        <input type='search' placeholder='Поиск' onChange={onChange} className='movieSearch__searchInput'></input>

        <div>
            <ul className={`movieSearch__list ${searchListVis ? "movieSearch__listActive" : ""}`}>
                {movieSearchQuery.data?.map((movie) => (
                    <Link onClick={onClickLing} id="searchLink" to={`/movie/${movie.id}`}>
                        <li className="movieSearch__list-element" style={{ backgroundImage: "url(" + movie.posterUrl + ")" }} key={movie.id} >
                            <MovieSearchElement movie={movie} />
                        </li>
                    </Link>
                ))}

            </ul>
        </div>

    </div>)
}