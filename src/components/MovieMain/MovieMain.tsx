import { Link } from "react-router-dom";
import { useMovie } from "../../hooks/useMovie";
import { Button } from "../Button/Button";
import { Rating } from "../Rating/Rating";
import reloadIco from "../../assets/reload.svg?url";
import { Loader } from "../Loader/Loader";
import imageNone from "../../assets/image_none.jpg"

import "./style/MovieMain.css";
import { translateGenre } from "../../function/TranslateGenre";
import { useState } from "react";
import { TrailerPlayer } from "../TrailerPlayer/TrailerPlayer";
import { useFavorite } from "../../hooks/useFavorite";
import { AuthForm } from "../AuthForm/AuthForm";
import { queryClient } from "../../API/queryClient";
import { profileUser } from "../../API/users";
import { useQuery } from "@tanstack/react-query";


export const MovieMain = () => {

    const meQuery = useQuery({
        queryFn: () => profileUser(),
        queryKey: ["profile"],
        retry: false
    },
        queryClient);

    const [modalIsOpenTrailer, setModalIsOpenTrailer] = useState(false);
    const [modalIsOpenAuth, setModalIsOpenAuth] = useState(false);

    const openModalTrailer = () => {
        setModalIsOpenTrailer(true);
        document.body.style.overflow = 'hidden';
    };
    const closeModalTrailer = () => {
        setModalIsOpenTrailer(false);
        document.body.style.overflow = 'unset';
    };

    const openModalAuth = () => {
        setModalIsOpenAuth(true);
        document.body.style.overflow = 'hidden';
    };
    const closeModalAuth = () => {
        setModalIsOpenAuth(false);
        document.body.style.overflow = 'unset';
    };

    const { movie, genre, times, plot, reload, status, location, animation } = useMovie();

    const { favoriteIco, favoriteButtonClick } = useFavorite(movie.id);


    switch (status) {
        case "pending":
            return <h2 className="movie__title" style={{ display: "flex", gap: "15px", width: "100vw", alignItems: "center", marginBottom: "150px" }}>Загрузка страницы<Loader /></h2>;
        case "success":
            return (<div className={`movie ${animation ? "show-opacity" : ""}`}>

                <div className='movie__textBlock'>

                    <div className='movie__textBlock-info'>
                        <Rating rating={movie.tmdbRating} />
                        <span>{movie.releaseYear}</span>
                        <span>{translateGenre(genre)}</span>
                        <span>{times}</span>
                    </div>

                    <h2 className='movie__textBlock-title'>{movie.title}</h2>
                    <p className='movie__textBlock-plot'>{plot}</p>

                    <div className='movie__textBlock-btnGroup'>
                        <Button
                            click={openModalTrailer}
                            title={"Трейлер"}
                            color={"rgba(103, 165, 235, 1)"}
                            basis={document.documentElement.scrollWidth < 550 && location.pathname === "/" ? true : false}
                        />
                        {location.pathname === "/" && <Link to={`/movie/${movie.id}`}><Button title={"О фильме"} /></Link>}

                        <Button
                            ico={favoriteIco}
                            click={() => meQuery.refetch().then(meQuery.status === "success" ? favoriteButtonClick : openModalAuth)}
                        />

                          <AuthForm isOpen={modalIsOpenAuth} onRequestClose={closeModalAuth} />


                        {location.pathname === "/" && <Button ico={reloadIco} click={reload} />}
                        <TrailerPlayer isOpen={modalIsOpenTrailer} onRequestClose={closeModalTrailer} videoUrl={movie.trailerUrl} videoTitle={movie.title} />

                    </div>
                </div>
                <img className='movie__poster' src={movie.backdropUrl || imageNone} alt={movie.title}></img>
            </div>);
        case "error":
            return <h1>Error: </h1>;

    };
} 