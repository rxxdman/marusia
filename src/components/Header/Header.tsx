import { Link, useLocation } from "react-router-dom"
import Logo from "../../assets/header/logo.svg"
import './style/Header.css'
import { MovieSearch } from "../MovieSearch/MovieSearch";
import Modal from "react-modal";
import { useState } from "react";
import { Account } from "../Account/Account";

export const Header = () => {

    const location = useLocation();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (

        <header className='header'>
            <Link to={"/"}><img src={Logo} alt="Логотип" className='header__logo' /></Link>
            {document.documentElement.scrollWidth <= 990 && (
                <div className='header__section'>

                    <Link to={"/genres"} className="header__section-link-ico">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 9.5C2.51472 9.5 0.5 7.48528 0.5 5C0.5 2.51472 2.51472 0.5 5 0.5C7.48528 0.5 9.5 2.51472 9.5 5C9.5 7.48528 7.48528 9.5 5 9.5ZM5 19.5C2.51472 19.5 0.5 17.4853 0.5 15C0.5 12.5147 2.51472 10.5 5 10.5C7.48528 10.5 9.5 12.5147 9.5 15C9.5 17.4853 7.48528 19.5 5 19.5ZM15 9.5C12.5147 9.5 10.5 7.48528 10.5 5C10.5 2.51472 12.5147 0.5 15 0.5C17.4853 0.5 19.5 2.51472 19.5 5C19.5 7.48528 17.4853 9.5 15 9.5ZM15 19.5C12.5147 19.5 10.5 17.4853 10.5 15C10.5 12.5147 12.5147 10.5 15 10.5C17.4853 10.5 19.5 12.5147 19.5 15C19.5 17.4853 17.4853 19.5 15 19.5ZM5 7.5C6.38071 7.5 7.5 6.38071 7.5 5C7.5 3.61929 6.38071 2.5 5 2.5C3.61929 2.5 2.5 3.61929 2.5 5C2.5 6.38071 3.61929 7.5 5 7.5ZM5 17.5C6.38071 17.5 7.5 16.3807 7.5 15C7.5 13.6193 6.38071 12.5 5 12.5C3.61929 12.5 2.5 13.6193 2.5 15C2.5 16.3807 3.61929 17.5 5 17.5ZM15 7.5C16.3807 7.5 17.5 6.38071 17.5 5C17.5 3.61929 16.3807 2.5 15 2.5C13.6193 2.5 12.5 3.61929 12.5 5C12.5 6.38071 13.6193 7.5 15 7.5ZM15 17.5C16.3807 17.5 17.5 16.3807 17.5 15C17.5 13.6193 16.3807 12.5 15 12.5C13.6193 12.5 12.5 13.6193 12.5 15C12.5 16.3807 13.6193 17.5 15 17.5Z" fill="white" />
                        </svg>
                    </Link>

                    <svg onClick={openModal } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3591 14.6168L20.6418 18.8995L19.2276 20.3137L14.9449 16.031C13.405 17.263 11.4521 18 9.32812 18C4.36013 18 0.328125 13.968 0.328125 9C0.328125 4.032 4.36013 0 9.32812 0C14.2961 0 18.3281 4.032 18.3281 9C18.3281 11.124 17.5911 13.0769 16.3591 14.6168ZM14.3528 13.8748C15.5756 12.6146 16.3281 10.8956 16.3281 9C16.3281 5.1325 13.1956 2 9.32812 2C5.46062 2 2.32812 5.1325 2.32812 9C2.32812 12.8675 5.46062 16 9.32812 16C11.2237 16 12.9427 15.2475 14.2029 14.0247L14.3528 13.8748Z" fill="white" />
                    </svg>

                    <Modal ariaHideApp={false} style={{overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }}} className="modalSearch" isOpen={modalIsOpen} onRequestClose={closeModal}>
                        <MovieSearch closeModal={closeModal} />
                    </Modal>

                    <Account/>
                </div>
            )}

            {document.documentElement.scrollWidth >= 991 && (
                <div className='header__section'>
                    <Link to={"/"} className={`header__section-link ${location.pathname === '/' ? "active" : ""}`}>Главная</Link>
                    <Link to={"/genres"} className={`header__section-link ${location.pathname === '/genres' ? "active" : ""}`}>Жанры</Link>
                    <MovieSearch />
                </div>)}
            {document.documentElement.scrollWidth >= 991 && (
               <Account/>
            )}
        </header>)
}