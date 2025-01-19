import React, { useState, useRef } from "react";
import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { User } from "../type/type";
import { signUp, uploadIcon } from "../api/api";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Header from "../Header";

const SignUp = () => {
  const auth = useSelector(
    (state: { auth: { isSignIn: boolean } }) => state.auth.isSignIn
  );
  const dispatch = useDispatch();
  const [, setCookies] = useCookies();
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [userErrorMessage, setUserErrorMessage] = useState<string>("");
  const [iconErrorMessage, setIconErrorMessage] = useState<string>("");
  const [iconUrl, setIconUrl] = useState<string>("");

  const iconRef = useRef<HTMLInputElement>(null);
  const isVaild: SubmitHandler<User> = async (data: User) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const responseUser = await signUp(newUser);
    const resultUser = await responseUser.json();
    if (responseUser.ok) {
      setIsSignup(true);
      setCookies("token", resultUser.token);
      dispatch(signIn());
    } else {
      setUserErrorMessage(`${responseUser.status} 認証に失敗しました`);
    }
    const icon = iconRef.current?.files?.[0];
    if (!icon) {
      setIconErrorMessage("アイコン画像が必要です");
      return;
    }
    const responseIcon = await uploadIcon(icon!, resultUser.token);
    const resultIcon = await responseIcon.json();
    if (responseIcon.ok) {
      setIconUrl(resultIcon.url);
    } else {
      setIconErrorMessage(
        `${responseIcon.status} アイコンのアップロードに失敗しました`
      );
    }
  };

  const isInVaild: SubmitErrorHandler<User> = (error) => {
    console.log(error);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  if (auth) {
    return <Navigate to="/" />;
  }
  return (
    <React.Fragment>
      <Header />
      {isSignup ? (
        <div>
          <h1>認証成功</h1>
        </div>
      ) : (
        <div></div>
      )}
      <p>{userErrorMessage}</p>
      <form onSubmit={handleSubmit(isVaild, isInVaild)}>
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "名前を入力してください" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
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
        <label htmlFor="icon">アイコン</label>
        <input id="icon" type="file" ref={iconRef} />
        {iconErrorMessage ? <p>{iconErrorMessage}</p> : null}
        <button type="submit">新規登録</button>
      </form>
      <Link to="/logIn">ログインはこちら</Link>
    </React.Fragment>
  );
};
export default SignUp;
