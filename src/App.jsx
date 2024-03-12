import { useEffect, useState } from "react";
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
import { ToastContainer } from "react-toastify";
// import LoginModal from "./components/loginModal/LoginModal.jsx";

function App() {
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
