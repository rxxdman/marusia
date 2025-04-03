import { MovieInfo } from "../../components/MovieInfo/MovieInfo";
import { MovieMain } from "../../components/MovieMain/MovieMain";
import "./style/MoviePage.css";
import "../page.css";

export function MoviePage() {

	return (
		<div className={`page ${location ? "page-active" : ""}`}>
			<MovieMain/>
			<MovieInfo/>
		</div>
	);
}