import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import { useSelector } from "react-redux";

const Router = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/" element={<h1>hello</h1>} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
