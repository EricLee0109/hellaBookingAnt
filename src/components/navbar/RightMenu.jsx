import {
  CalendarOutlined,
  GoogleOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../googleSignIn/config";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

function RightMenu({ mode }) {
  const authUser = useAuthUser();
  const userSignOut = useSignOut();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const USER_URL = "/users";

  //
  const authUserGoogle = localStorage.getItem("userAccessToken");
  const signOutGoogle = signOut(auth);

  const handleSignOut = (e) => {
    userSignOut();
    console.log(userSignOut(), "userSignOut");
    console.log(authUser, "authUserrrr");
    if (authUser) {
      navigate("/");
    }
    window.location.reload();
    setTimeout((toast.success("You have been signed out"), 3000));
  };

  const handleSignOutGoogle = (e) => {
    signOutGoogle
      .then(() => {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        toast.success("You have been signed out");
        window.location.reload();
        // Sign-out successful.
      })
      .catch((error) => {
        toast.error(error.message);
        // An error happened.
      });
  };

  useEffect(() => {
    axios.get(USER_URL + "/" + authUser?.id).then((res) => {
      setUserData(res.data.data);
      console.log(res.data.data, "res.data");
    });
  }, [authUser]);

  console.log(authUser, "authUser");
  return authUser || authUserGoogle ? (
    <Menu mode={mode}>
      {/* <Menu.Item icon={<UserOutlined />} key="signIn">
        <Link to="/login">Setting</Link>
      </Menu.Item> */}
      {authUserGoogle ? null : (
        <>
          <Menu.Item icon={<UserOutlined />} key="signOut">
            <Link to="/profile">Account</Link>
          </Menu.Item>
          {userData.roleId === 1 && (
            <Menu.Item icon={<CalendarOutlined />}>
              <Link to="/schedule">Schedule</Link>
            </Menu.Item>
          )}
        </>
      )}
      {authUserGoogle ? (
        <Menu.Item
          onClick={handleSignOutGoogle}
          icon={<GoogleOutlined />}
          key="signUp"
        >
          Logout
        </Menu.Item>
      ) : (
        <Menu.Item
          onClick={handleSignOut}
          icon={<LogoutOutlined />}
          key="signOut"
        >
          Logout
        </Menu.Item>
      )}
    </Menu>
  ) : (
    <Menu mode={mode}>
      <Menu.Item icon={<LoginOutlined />} key="signIn">
        <Link to="/login">Sign In</Link>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />} key="signUp">
        <Link to="/login">Sign Up</Link>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;
