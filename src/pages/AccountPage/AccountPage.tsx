import "./style/AccountPage.css";
import { useQuery } from "@tanstack/react-query";
import { profileUser } from "../../API/users";
import { queryClient } from "../../API/queryClient";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import favoriteIco from "../../assets/favorite.svg?url"
import userIco from "../../assets/header/userOff.svg?url"
import { AccountSettings } from "../../components/AccountSettings/AccountSettings";
import { FavoriteMovieList } from "../../components/FavoriteMovieList/FavoriteMovieList";

export function AccountPage() {

	const navigate = useNavigate();

	const [accountPage, setAccountPage] = useState<string>("favorite")

	const meQuery = useQuery({
		queryFn: () => profileUser(),
		queryKey: ["profile"],
		retry: false
	},
		queryClient);

	switch (meQuery.status) {
		case "pending":
			return <Loader />;
		case "error":
			navigate('/');
			break;
		case "success":
			return (<div className="account">
				<h2 className="account__title">Мой аккаунт</h2>

				<div className="account__menu">
					<button
						className={`account__menu-button ${accountPage === "favorite" && "account__menu-active"}`}
						style={{ backgroundImage: `url("${favoriteIco}")` }}
						onClick={() => setAccountPage("favorite")}
					>
						{document.documentElement.scrollWidth > 600 ? "Избранные фильмы" : "Избранное"}
					</button>
					<button
						className={`account__menu-button ${accountPage === "setting" && "account__menu-active"}`}
						style={{ backgroundImage: `url("${userIco}")` }}
						onClick={() => setAccountPage("setting")}
					>
						{document.documentElement.scrollWidth > 600 ? "Настройки аккаунта" : "Настройки"}
					</button>
				</div>

				{accountPage === "favorite" ? <FavoriteMovieList/> : <AccountSettings User={meQuery.data}/> }

			</div>);
	}
}