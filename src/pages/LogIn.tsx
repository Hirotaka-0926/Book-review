import React, { useState } from "react";
import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";
import { logIn } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { signIn } from "../slice";

interface LoginData {
  email: string;
  password: string;
}

const LogIn = () => {
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const auth = useSelector((state: { auth: boolean }) => state.auth);
  const [cookies, setToken] = useCookies();
  const dispatch = useDispatch();

  const isVaild: SubmitHandler<LoginData> = async (data: LoginData) => {
    const response = await logIn(data.email, data.password);
    const result = await response.json();
    if (response.ok) {
      setIsLogIn(true);
      setToken("token", result.token);
      dispatch(signIn());
      console.log(auth);
    } else {
      setErrorMessage(`${response.status} 認証に失敗しました`);
    }
  };

  const isInVaild: SubmitErrorHandler<LoginData> = (error) => {
    console.log(error);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  if (auth) {
    return <Navigate to="/" />;
  }
  return (
    <React.Fragment>
      {isLogIn ? (
        <div>
          <h1>認証成功</h1>
        </div>
      ) : (
        <div></div>
      )}
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit(isVaild, isInVaild)}>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "メールアドレスを入力してください",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "パスワードを入力してください",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">ログイン</button>
      </form>

      <Link to="/signup">新規登録</Link>
    </React.Fragment>
  );
};
export default LogIn;
