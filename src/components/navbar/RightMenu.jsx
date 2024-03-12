import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, redirect, useNavigate } from "react-router-dom";

function RightMenu({ mode }) {
  const authUser = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
  };

  console.log(authUser, "authUser");
  return authUser ? (
    <Menu mode={mode}>
      {/* <Menu.Item icon={<UserOutlined />} key="signIn">
        <Link to="/login">Setting</Link>
      </Menu.Item> */}
      <Menu.Item icon={<UserOutlined />} key="signUp">
        <Link to="/profile">Account</Link>
      </Menu.Item>
      <Menu.Item onClick={handleSignOut} icon={<LogoutOutlined />} key="signUp">
        Logout
      </Menu.Item>
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
