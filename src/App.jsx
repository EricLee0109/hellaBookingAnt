import { useEffect, useState } from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import SearchPage from "./components/search/SearchPage.jsx";
import "./static/style.js";
// import LoginModal from "./components/loginModal/LoginModal.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import LoginPage from "./components/loginPage/LoginPage.jsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

function App() {
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth fallbackPath="/login">
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>;
}

export default App;
