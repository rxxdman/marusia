import { useMoviesList } from "../../hooks/UseMoviesList";
import "./style/MovieListTop10.css";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import { Loader } from "../Loader/Loader";

export const MovieListTop10 = () => {

    const { movies, status, animation } = useMoviesList();

    switch (status) {
        case "pending":
            return (<h3 className="topTenMovie__title" style={{display: "flex", gap: "10px", alignItems: "center"}}>Топ 10 фильмов <Loader /></h3>)
        case "success":
            return (<div className={`topTenMovie ${animation ? "show-margin" : ""}`}>
                <h3 className="topTenMovie__title">Топ 10 фильмов</h3>

                <ul className="topTenMovie__list">
                    {movies.map((movie, index) => (
                        <li className="topTenMovie__list-element" key={movie.id} >
                            <MoviePoster 
                            id={movie.id} 
                            poster={movie.posterUrl ? movie.posterUrl : null} 
                            topPosition={index + 1}
                            title={movie.posterUrl ? '' : movie.title }
                             />
                        </li>
                    ))}
                </ul>

            </div>)
    }


}