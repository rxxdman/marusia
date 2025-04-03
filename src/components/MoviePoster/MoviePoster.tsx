import { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./style/MoviePoster.css";
import posterNone from "../../assets/poster_none.jpg?url"
import { useFavorite } from "../../hooks/useFavorite";

export interface MoviePosterProps {
    id: number;
    poster: string | null;
    topPosition?: number;
    title?: string;
    btnDelete?: boolean;
}

export const MoviePoster: FC<MoviePosterProps> = ({ id, poster, topPosition, title, btnDelete}) => {

    const Style = {
        backgroundImage: `url(${poster ? poster : posterNone})`,
    }

    const [hover, setHover] = useState(false);

    const onMouseEnter = () => {
        setHover(true);
    }
    const onMouseLeave = () => {
        setHover(false)
    }

    const { deleteFavoriteClick } = useFavorite(id)

    return (<div className="poster-container"  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} > 
          {btnDelete && <button className={`moviePoster__btnClose ${hover ? "moviePoster__btnCloseShow" : ""}`} onClick={deleteFavoriteClick} ></button>}
         <Link to={`/movie/${id}`} className="moviePoster-link">
            <article className="moviePoster"style={Style} >
                {topPosition && (<p className="moviePoster__top">{topPosition}</p>)}
                {!poster && <h3 className="moviePoster__title">Фильм: {title}</h3>}
            </article >

        </Link>
    </div>
    )
}