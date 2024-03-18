import { Button } from "antd";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./config";
import { useState } from "react";
import Home from "./Home";
import { theme } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
import { verifyTokenGoogle } from "../helper/LoginAPI";
import { useNavigate } from "react-router-dom";

function LoginGoogle() {
  const { token } = theme.useToken();
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const iconStyles = {
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        //Google access token
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        //user info
        const user = res.user;
        setUser(user.email);
        console.log(user.accessToken, "user info");
        //verify token
        localStorage.setItem("userAccessToken", user.accessToken);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.displayName);
        navigate("/");
      })
      .catch((err) => {
        // Handle Errors here.
        const errorCode = err.code;
        const errorMessage = err.message;
        // The email of the user's account used.
        const email = err.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(err);
      });
  };
  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: 40,
        width: 40,
        border: "1px solid " + token.colorPrimaryBorder,
        borderRadius: "50%",
      }}
    >
      <GoogleOutlined style={{ ...iconStyles, color: "#FF6A10" }} />
    </div>
  );
}

export default LoginGoogle;
