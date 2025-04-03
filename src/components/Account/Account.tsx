import { useQuery } from "@tanstack/react-query";
import { profileUser } from "../../API/users";
import { queryClient } from "../../API/queryClient";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import Modal from "react-modal";

export const Account = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = 'hidden'; // Отключаем прокрутку
    };
    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = 'unset'; // Включаем прокрутку обратно
    };

    Modal.setAppElement('#root');

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
            return (<>
                {document.documentElement.scrollWidth < 450 &&
                    <svg onClick={openModal} style={{ cursor: "pointer" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white" />
                    </svg>}

                {document.documentElement.scrollWidth >= 450 &&
                    <p onClick={openModal} style={{ cursor: "pointer" }} className={`header__section-link ${location.pathname === '/account' ? "active" : ""}`}>Войти</p>}

                <AuthForm isOpen={modalIsOpen} onRequestClose={closeModal} />
            </>);
        case "success":
            return (<>

                {document.documentElement.scrollWidth < 450 &&
                    <Link to={"/account"} className="header__section-link-ico">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z" fill="white" />
                        </svg>
                    </Link>}

                {document.documentElement.scrollWidth >= 450 &&
                    <Link to={"/account"} className={`header__section-link ${location.pathname === '/account' ? "active" : ""}`}>{meQuery.data.name[0].toUpperCase() + meQuery.data.name.slice(1).toLowerCase()}</Link>}

            </>);
    }
}