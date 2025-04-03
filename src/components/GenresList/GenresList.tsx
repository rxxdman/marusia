import { Link } from "react-router-dom";
import { useGenres } from "../../hooks/useGenres"
import { Genre } from "./Genre";
import "./style/GenresList.css";
import { movieList } from "../../API/movie";


export const GenresList = () => {

    const { genres } = useGenres();

    const movieList = [] as movieList;

    return (
        <ul className="genres__list">
            {genres.map((genre, index) => (
                <li className="genres__list-element" key={index}>
                    <Link to={`/genres/${genre}`} className="genres__list-element-link">
                        <Genre genre={genre} movieList={movieList} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}