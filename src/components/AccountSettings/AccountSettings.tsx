import "./style/AccountSettings.css"
import { FC } from "react"
import { User } from "../../API/users"
import { Button } from "../Button/Button"
import { useUser } from "../../hooks/useUser"

interface AccountSettingsprops {
    User: User
}

export const AccountSettings: FC<AccountSettingsprops> = ({ User }) => {

    const { logoutClick } = useUser();

    return (<div className="settings">

        <div className="settings__parametr">
            <button className="settings__parametr-ico" style={{ padding: document.documentElement.scrollWidth > 1000 ? "14px" : "8px" }}>
                {User.name[0].toUpperCase() + User.surname[0].toUpperCase()}
            </button>
            <div className="settings__parametr-textBlock">
                <h3 className="settings__parametr-textBlock-title">Имя фамилия</h3>
                <p className="settings__parametr-textBlock-text">{(User.name[0].toUpperCase() + User.name.slice(1).toLowerCase()) + ' ' + (User.surname[0].toUpperCase() + User.surname.slice(1).toLowerCase())}</p>
            </div>
        </div>

        <div className="settings__parametr" style={{ marginBottom: "64px" }}>
            <button className="settings__parametr-ico" style={{ padding: document.documentElement.scrollWidth > 1000 ? "18px" : "12px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white" />
                </svg>
            </button>
            <div className="settings__parametr-textBlock">
                <h3 className="settings__parametr-textBlock-title">Почта</h3>
                <p className="settings__parametr-textBlock-text">{User.email}</p>
            </div>
        </div>
        <Button
            title="Выйти из аккаунта"
            color="rgba(103, 165, 235, 1)"
            basis={document.documentElement.scrollWidth < 1000 && true}
            click={logoutClick}
        />

    </div>)
}