import { MovieMain } from "../../components/MovieMain/MovieMain";
import { MovieListTop10 } from "../../components/MovieListTop10/MovieListTop10";
import "./style/MainPage.css";
import "../page.css";

export function MainPage() {;

	return (
		<div className={`page ${location.pathname === '/' ? "page-active" : ""}`}>
			<MovieMain/>
			<MovieListTop10/>
		</div>
	);
}