import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { registerUser } from "../../../API/users";
import { queryClient } from "../../../API/queryClient";
import { Button } from "../../Button/Button";

import mailIco from "../../../assets/auth/mail.svg?url";
import userIco from "../../../assets/auth/userOff.svg?url";
import passwordIco from "../../../assets/auth/passwordKey.svg?url";

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({onSuccess}) => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const registerMutation = useMutation({
    mutationFn: () => registerUser(watch("email"), watch("password"), watch("name"), watch("surname")),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] })
    },
  }, queryClient)

  const icoError = (ico: string) => {
    const newico = ico.replace("rgba(0,%200,%200,%200.4)", "rgba(255, 117, 117, 1)");
    return newico
  }

  const password = watch('password');

  return (
    <form className="auth-form__context"
      onSubmit={handleSubmit(() => {
        registerMutation.mutate();
        onSuccess();
      })}
      autoComplete="off"
      >

      
      <input className={`auth-form__context-input ${errors.email && "auth-form__context-input-error"}`}
        {...register("email", {
          required: "Поле обязательно для заполнения",
        })}
        placeholder="Электронная почта"
        style={{backgroundImage: `url("${!errors.email ? mailIco : icoError(mailIco)}")`}}
      />


      <input className={`auth-form__context-input ${errors.name && "auth-form__context-input-error"}`}
        {...register("name", {
          required: "Поле обязательно для заполнения",
          minLength: { value: 5, message: "Поле 'имя' должно содержать не менее пяти символов." }
        })}
        placeholder="Имя"
        style={{backgroundImage: `url("${!errors.name ? userIco : icoError(userIco)}")`}}
        autoComplete="off"
      />


      <input className={`auth-form__context-input ${errors.surname && "auth-form__context-input-error"}`}
        {...register("surname", {
          required: "Поле обязательно для заполнения",
          minLength: { value: 5, message: "Поле 'имя' должно содержать не менее пяти символов." }
        })}
        placeholder="Фамилия"
        style={{backgroundImage: `url("${!errors.surname ? userIco : icoError(userIco)}")`}}
      />


      <input className={`auth-form__context-input ${errors.password && "auth-form__context-input-error"}`}
        {...register("password", {
          required: "Поле обязательно для заполнения",
          minLength: { value: 8, message: "Пароль должен содержать не менее восьми символов." }
        })}
        type="password"
        placeholder="Пароль"
        style={{backgroundImage: `url("${!errors.password ? passwordIco : icoError(passwordIco)}")`}}
      />

      <input  className={`auth-form__context-input ${errors.password2 && "auth-form__context-input-error"}`}
        {...register("password2", {
          required: "Поле обязательно для заполнения",
          minLength: { value: 8, message: "Пароль должен содержать не менее восьми символов." },
          validate: (value) =>
            value === password || 'Пароли не совпадают'
        })}
        type="password"
        placeholder="Повторите пароль"
        style={{backgroundImage: `url("${!errors.password2 ? passwordIco : icoError(passwordIco)}")`}}
      />


      <Button title="Создать аккаунт" basis={true} color="rgba(103, 165, 235, 1)" padding="16px 75px" type="submit" isLoading={registerMutation.isPending}></Button>
    </form>
  );
};
