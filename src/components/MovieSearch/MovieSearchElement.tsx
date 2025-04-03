import { Rating } from "../Rating/Rating"
import { movie } from "../../API/movie"
import { FC } from "react"
import "./style/MovieSearch.css"
import { translateGenre } from "../../function/TranslateGenre"

interface MovieSearchElementProps {
    movie: movie
}

export const MovieSearchElement: FC<MovieSearchElementProps> = ({ movie }) => {

    return <div>
        <div className='movieSearch__list-element-info'>
            <Rating rating={Number(movie.tmdbRating.toFixed(1))} big={false} />
            <span style={{whiteSpace: "nowrap"}}>{movie.releaseYear}</span>
            <span style={{whiteSpace: "nowrap"}}>{translateGenre(movie.genres[0])}</span>
            <span style={{whiteSpace: "nowrap"}}>{Math.trunc(movie.runtime / 60) + " ч " + movie.runtime % 60 + " мин"}</span>
        </div>
        <h3 className="movieSearch__list-element-title">{movie.title}</h3>
    </div>


}