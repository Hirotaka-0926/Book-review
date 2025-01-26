import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./slice";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { getProfile } from "./api/api";

const Header = () => {
  const auth = useSelector(
    (state: { auth: { isSignIn: boolean } }) => state.auth.isSignIn
  );
  const [userName, setUserName] = useState<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, , removeCookies] = useCookies();
  const token = cookies.token;

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookies("token");
    navigate("/login");
  };

  useEffect(() => {
    const getUserName = async () => {
      const response = await getProfile(token);
      console.log(auth);
      const data = await response.json();
      if (response.ok) {
        setUserName(data.name);
      }
    };
    if (auth) {
      getUserName();
    }
  });

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h2>Header</h2>
      {auth ? (
        <React.Fragment>
          <button
            className=" bg-blue-500 text-white p-2 rounded-md hover:bg-blue-500 transition duration-300"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          <h2 className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {userName}
          </h2>

          <Link
            className="justify-end text-blue-500 hover:underline right-0 "
            to="/profile"
          >
            マイアカウント
          </Link>
        </React.Fragment>
      ) : (
        <button
          className=" bg-blue-500 text-white p-2 rounded-md hover:bg-blue-500 transition duration-300"
          onClick={() => navigate("logIn")}
        >
          LogInへ
        </button>
      )}
    </header>
  );
};

export default Header;
