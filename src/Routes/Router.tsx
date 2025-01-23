import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import { useSelector } from "react-redux";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import NewBook from "../pages/NewBook";
import EditBook from "../pages/EditBook"

const Router = () => {
  const auth = useSelector(
    (state: { auth: { isSignIn: boolean } }) => state.auth.isSignIn
  );
  console.log(auth);
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />

      {auth ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<NewBook />} />
          <Route path = "/edit" element={<EditBook/>}
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default Router;
