import "./GenresPage.css";
import "../page.css";
import { GenresList } from "../../components/GenresList/GenresList";

export function GenresPage() {
	return (
		<div className={`page ${location ? "page-active" : ""}`}>
			<h2 className="page__title">Жанры фильмов</h2>

			<GenresList/>

		</div>
	);
}