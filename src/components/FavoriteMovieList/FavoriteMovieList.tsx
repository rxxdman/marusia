import { MoviePoster } from "../MoviePoster/MoviePoster"
import { useMoviesList } from "../../hooks/UseMoviesList";
import './style/FavoriteMovieList.css'


export const FavoriteMovieList = () => {

    const { movies } = useMoviesList();

    return  <ul className="FavoriteMovieList">
                    {movies.map((movie) => (
                        <li className="FavoriteMovieList-element"key={movie.id} >
                            <MoviePoster 
                            id={movie.id} 
                            poster={movie.posterUrl ? movie.posterUrl : null} 
                            title={movie.posterUrl ? '' : movie.title }
                            btnDelete={true}
                             />
                        </li>
                    ))}
                </ul>
}