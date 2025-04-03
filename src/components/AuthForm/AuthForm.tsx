import { FC, useState } from "react";

import Modal from "react-modal";

import "./style/AuthForm.css";
import { RegisterForm } from "./RegisterForm/RegisterForm";
import { LoginForm } from "./LoginForm/LoginForm";
import { Button } from "../Button/Button";

interface AuthFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
}


export const AuthForm: FC<AuthFormProps> = ({ isOpen, onRequestClose }) => {

  const [authType, setAuthType] = useState<string>("auth");
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register",
    );
    setRegistrationSuccess(false);
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };

  return (
    <Modal className="auth__modal"
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ overlay: { backgroundColor: "trantransparent" } }}
    >
      <div className="auth-form">

        <button className="auth__modal-closeBtn" onClick={onRequestClose} />

        <p className="auth-form__title"> {authType === "register" ? (registrationSuccess ? "Регистрация завершена" : "Регистрация") : ""} </p>

        {registrationSuccess ? (
          <div className="auth-form__messageBlock" style={{display: "flex", flexDirection: "column", gap: "24px"}}>
            <p className="auth-form__messageBlock-text">Используйте вашу электронную почту для входа</p>
            <Button
              title="Войти"
              click={handleClick}
              basis={true}
              color="rgba(103, 165, 235, 1)"
              padding="16px 97.5px"
            />

          </div>
        ) : (
          authType === "register" ? (
            <RegisterForm onSuccess={handleRegistrationSuccess} />
          ) : (
            <LoginForm closeModal={onRequestClose} />
          )
        )}


        <div className="auth-form__info">
          {!registrationSuccess &&
            <button className="auth-form__button" onClick={handleClick}>
              {authType === "register" ? "У меня есть пароль" : "Регистрация"}
            </button>
          }
        </div>
      </div>

    </Modal>

  );
};
