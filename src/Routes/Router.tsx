import { Route, Routes } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import { useSelector } from "react-redux";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import NewBook from "../pages/NewBook";
import EditBook from "../pages/EditBook";
import Detail from "../pages/Detail";

const Router = () => {
  const auth = useSelector(
    (state: { auth: { isSignIn: boolean } }) => state.auth.isSignIn
  );
  console.log(auth);
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/new" element={<NewBook />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/edit/:id" element={<EditBook />} />
    </Routes>
  );
};

export default Router;
