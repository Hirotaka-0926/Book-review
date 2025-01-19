import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import { useSelector } from "react-redux";
import HeaderLayout from "../HeaderLayout";
import Home from "../pages/Home";

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
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default Router;
