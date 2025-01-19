import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./slice";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const auth = useSelector((state: { auth: boolean }) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removeCookies] = useCookies();

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookies("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h2>Header</h2>
      {auth ? (
        <button
          className=" bg-blue-500 text-white p-2 rounded-md hover:bg-blue-500 transition duration-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      ) : null}
      <Link
        className="justify-end text-blue-500 hover:underline right-0 "
        to="account"
      >
        マイアカウント
      </Link>
    </header>
  );
};

export default Header;
