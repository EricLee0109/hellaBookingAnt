import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import ErrorPage from "./components/errorPage/ErrorPage.jsx";
import LoginPage from "./components/loginPage/LoginPage.jsx";
import TestDash from "./dashboard/TestDash.jsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import TourDetail from "./components/tourDetail/tourDetail.jsx";
import PaymentPage from "./payment/PaymentPage.jsx";
import PaymentSuccess from "./payment/PaymentSuccess.jsx";
import SearchPage from "./components/search/SearchPage.jsx";
import ProfilePage from "./components/profilePage/ProfilePage.jsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Schedule from "./components/scheduleTourGuide/Schedule.jsx";
// import { AuthProvider } from "react-auth-kit";

// import './index.css'
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

//router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "tourDetail/:id",
        element: <TourDetail />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "payment",
        element: (
          <RequireAuth>
            <PaymentPage />
          </RequireAuth>
        ),
      },
      {
        path: "paymentSuccess",
        element: (
          <RequireAuth>
            <PaymentSuccess />
          </RequireAuth>
        ),
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "schedule",
        element: (
          <RequireAuth>
            <Schedule />
          </RequireAuth>
        ),
      },
    ],
  },

  // {
  //   path: "/",
  //   element: <Home />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     //reder one more component in <Home> component with <Outlet> component
  //     {
  //       path: "/navbar",
  //       element: <Navbar />,
  //     },
  //   ],
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   path: "/tourDetail/:id",
  //   element: <TourDetail />,
  // },
  // {
  //   path: "/payment",
  //   element: (
  //     <RequireAuth>
  //       <PaymentPage />
  //     </RequireAuth>
  //   ),
  // },
  // {
  //   path: "/navbar",
  //   element: <Navbar />,
  // },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 2,
          // colorBgContainer: "#fefefe",
        },
      }}
    >
      <AuthProvider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>
);
