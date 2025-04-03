import { useMovie } from "../../hooks/useMovie";
import { MovieParametr } from "../MovieParametr/MovieParametr";
import "./style/MovieInfo.css";

export const MovieInfo = () => {
    const { movie } = useMovie();
    return (<div className="MovieInfo">
        <h2 className="MovieInfo__title">О фильме</h2>
        <div className="MovieInfo__text-block">
            {<MovieParametr param="language" title={movie.language ? movie.language : "Не известен"}/>}
            <MovieParametr param="budget" title={movie.budget ? movie.budget : "Не известен"}/>
            <MovieParametr param="revenue" title={movie.revenue ? movie.revenue : "Не известна"}/>
            <MovieParametr param="director" title={movie.director ? movie.director : "Не известен"}/>
            <MovieParametr param="production" title={movie.production ? movie.production : "Не известен"}/>
            <MovieParametr param="awards" title={movie.awardsSummary ? movie.awardsSummary : "Отсутвуют"}/>
        </div>
       
    </div>)
}
