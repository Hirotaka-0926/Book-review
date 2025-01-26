import { useState, useRef } from "react";
import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { User } from "../type/type";
import { uploadIcon, signUp } from "../api/api";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Header from "../Header";
import { signIn } from "../slice";
import Compressor from "compressorjs";

const SignUp = () => {
  const auth = useSelector(
    (state: { auth: { isSignIn: boolean } }) => state.auth.isSignIn
  );
  const dispatch = useDispatch();
  const [, setCookies] = useCookies();
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [userErrorMessage, setUserErrorMessage] = useState<string>("");
  const [iconErrorMessage, setIconErrorMessage] = useState<string>("");
  const [, setIconUrl] = useState<string>("");

  const iconRef = useRef<HTMLInputElement>(null);
  const pushSignUp: SubmitHandler<User> = async (data: User) => {
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
      setUserErrorMessage(
        `${responseUser.status} 認証に失敗しました  ${resultUser.ErrorMessageJP}`
      );
    }
    const icon = iconRef.current?.files?.[0];
    if (!icon) {
      setIconErrorMessage("アイコン画像が必要です");
      return;
    }
    new Compressor(icon, {
      quality: 0.6,
      async success(result: File) {
        const responseIcon = await uploadIcon(result!, resultUser.token);
        const resultIcon = await responseIcon.json();
        if (responseIcon.ok) {
          setIconUrl(resultIcon.url);
        } else {
          setIconErrorMessage(
            `${responseIcon.status} アイコンのアップロードに失敗しました`
          );
        }
      },
    });
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      {isSignup ? (
        <div>
          <h1>認証成功</h1>
        </div>
      ) : (
        <div></div>
      )}
      <p>{userErrorMessage}</p>
      <div className="container mx-auto p-4 ">
        <form
          onSubmit={handleSubmit(pushSignUp, isInVaild)}
          className="shadow-md bg-white rounded-md m-4"
        >
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            名前
          </label>
          <input
            id="name"
            type="text"
            className="border border-gray-300 p-2 w-full rounded-md"
            {...register("name", { required: "名前を入力してください" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <br />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-300 p-2 w-full rounded-md"
            {...register("email", {
              required: "メールアドレスを入力してください",
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            className="border border-gray-300 p-2 w-full rounded-md"
            {...register("password", {
              required: "パスワードを入力してください",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-gray-700"
          >
            アイコン
          </label>
          <input
            id="icon"
            type="file"
            ref={iconRef}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          {iconErrorMessage ? <p>{iconErrorMessage}</p> : null}
          <br />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            新規登録
          </button>
        </form>
      </div>
      <Link className="text-blue-500 hover:underline" to="/logIn">
        ログインはこちら
      </Link>
    </div>
  );
};
export default SignUp;
