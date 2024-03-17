import { useEffect, useRef, useState } from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Home from "./components/home/Home";
import SearchPage from "./components/search/SearchPage.jsx";
import "./static/style.js";
import Navbar from "./components/navbar/Navbar.jsx";
import { ToastContainer, toast } from "react-toastify";
import LoginPage from "./components/loginPage/LoginPage.jsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import LoginModal from "./components/loginModal/LoginModal.jsx";

function App() {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (authUser) {
  //     navigate("/");
  //     toast.info("You are already logged in");
  //   }
  // }, [authUser, navigate]);
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Outlet />
      {/*-- This is where the child components will be rendered -- */}
    </div>
  );
}

export default App;
