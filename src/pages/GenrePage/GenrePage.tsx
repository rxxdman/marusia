import "./style/GenrePage.css";
import "../page.css";
import { useNavigate } from "react-router-dom";
import { translateGenre } from "../../function/TranslateGenre";
import { MoviePoster } from "../../components/MoviePoster/MoviePoster";
import { Loader } from "../../components/Loader/Loader";
import { useMoviesList } from "../../hooks/UseMoviesList";
import { Button } from "../../components/Button/Button";

export function GenrePage() {

	const navigate = useNavigate();

	function goBack() {
		navigate(-1);
	}

	const { movies, onClickNextMovies, hasMoreMovies, params, status, animation } = useMoviesList();

	switch (status) {

		case "pending":
			return (
				<div className={`page ${location ? "page-active" : ""}`}>
					<h2 onClick={goBack} className="genrePage__title">{translateGenre(String(params.genres))}</h2>
					<Loader />
				</div>)

		case "success":
			return (
				<div className={`genrePage`}>
					<h2 onClick={goBack} className="genrePage__title">{translateGenre(String(params.genres))}</h2>

					<ul className={`genrePage__movie-list ${animation ? "show-margin" : ""}`}>
						{movies.map((movie) => (
							<li className="genrePage__movie-list-element" key={movie.id} >
								<MoviePoster
									id={movie.id}
									poster={movie.posterUrl ? movie.posterUrl : null} 
									title={movie.posterUrl ? "" : movie.title}/>
							</li>
						))}
					</ul>

					<div className="genrePage__btn-container">
						{hasMoreMovies && <Button color="rgba(103, 165, 235, 1)" title="Показать ещё" click={onClickNextMovies} />}
					</div>

				</div>)
	}
}