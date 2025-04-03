import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";


import mailIco from "../../../assets/auth/mail.svg?url";
import passwordIco from "../../../assets/auth/passwordKey.svg?url";
import { Button } from "../../Button/Button";
import { queryClient } from "../../../API/queryClient";
import { loginUser } from "../../../API/users";

interface LoginFormProps{
  closeModal(): void,
}

export const LoginForm: FC<LoginFormProps> = ({closeModal}) => {

  const icoError = (ico: string) => {
    const newico = ico.replace("rgba(0,%200,%200,%200.4)", "rgba(255, 117, 117, 1)");
    return newico
  }

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const loginMutation = useMutation({
    mutationFn: () => loginUser(watch("email"), watch("password")),
    onSuccess: (data) => {
      if (data.result) { 
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          closeModal();
      } else {
          console.error("Ошибка авторизации: неверные данные");
      }
  },
  }, queryClient);


  return (
     <form className="auth-form__context"
      onSubmit={handleSubmit(() => {
        loginMutation.mutate();
      })}
      autoComplete="off"
      >

      <input className={`auth-form__context-input ${errors.email && "auth-form__context-input-error"}`}
        {...register("email", {
          required: "Поле обязательно для заполнения",
        })}
        placeholder="Электронная почта"
        style={{ backgroundImage: `url("${!errors.email ? mailIco : icoError(mailIco)}")` }}
      />


      <input className={`auth-form__context-input ${errors.password && "auth-form__context-input-error"}`}
        {...register("password", {
          required: "Поле обязательно для заполнения",
          minLength: { value: 8, message: "Пароль должен содержать не менее восьми символов." }
        })}
        type="password"
        placeholder="Пароль"
        style={{ backgroundImage: `url("${!errors.password ? passwordIco : icoError(passwordIco)}")` }}
      />

     <Button title="Войти" basis={true} color="rgba(103, 165, 235, 1)" padding="16px 97.5px" type="submit" isLoading={loginMutation.isPending}></Button>
    </form>
  );
};