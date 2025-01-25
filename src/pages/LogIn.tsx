import React, { useState } from "react";
import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";
import { logIn } from "../api/api";
import { useSelector, useDispatch } from "react-redux";

import { signIn } from "../slice";
import Header from "../Header";

interface LoginData {
  email: string;
  password: string;
}

const LogIn = () => {
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const auth = useSelector(
    (state: { auth: { isSignIn: boolean } }) => state.auth.isSignIn
  );
  const [, setToken] = useCookies();
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
      <Header />
      {isLogIn ? (
        <div>
          <h1>認証成功</h1>
        </div>
      ) : (
        <div></div>
      )}
      <p>{errorMessage}</p>
      <div className="max-w-lg mx-auto p-4 bg-white border rounded-md shadow-md m-4">
        <form onSubmit={handleSubmit(isVaild, isInVaild)}>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            className="border border-gray-500 m-4"
            {...register("email", {
              required: "メールアドレスを入力してください",
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            className="border border-gray-500 m-4"
            {...register("password", {
              required: "パスワードを入力してください",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <button
            className="bg-slate-600 w-full text-white p-2 "
            type="submit"
            role="login"
          >
            LogIn
          </button>
        </form>
        <div className="text-center mt-4">
          <Link className="text-blue-600 hover:underline w-full" to="/signup">
            新規登録
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LogIn;
