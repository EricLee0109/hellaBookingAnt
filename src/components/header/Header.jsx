import { Avatar, Button, Card, Col, Row, Tooltip } from "antd";
import { header } from "../data";
import LoginModal from "../loginModal/LoginModal";
import { useState } from "react";
import axios from "../../api/axios";
import RegisterModal from "../../registerModal/RegisterModal";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {
  BoldOutlined,
  EditOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  SettingOutlined,
  SignatureOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Header() {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navgiate = useNavigate();
  const authUser = useAuthUser();

  const handleSignOut = () => {
    signOut(true);
    navgiate("/login");
  };

  // console.log(auth?.id, "auth");

  // const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  // const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

  // const showRegisterModal = () => {
  //   setIsRegisterModalVisible(!isRegisterModalVisible);
  // };

  // const showLoginModal = () => {
  //   setIsLoginModalVisible(!isLoginModalVisible);
  // };

  // const handleCancel = () => {
  //   setIsLoginModalVisible(false);
  //   setIsRegisterModalVisible(false);
  // };

  const filteredTitleData = authUser
    ? header.filter(
        (item) => item.title === "Tour" || item.title === "Tour Guide"
      )
    : header.title;

  const menuChild = (authUser ? filteredTitleData : header).map((item, i) => {
    const content = item.children.map((child, ii) => (
      <a href={child.link} key={ii.toString()} className="tip-block">
        <span className="tip-img">
          <img src={child.img} alt="img" />
        </span>
        <div className="tip-content">
          {child.title}
          <div>{child.desc}</div>
        </div>
      </a>
    ));

    console.log(filteredTitleData, "filteredTitleData");
    return (
      <Col key={i.toString()} span={6}>
        <Tooltip
          title={content}
          placement="bottom"
          overlayClassName="header-tip-wrap"
        >
          <span className="nav-title">{item.title}</span>
        </Tooltip>
      </Col>
    );
  });
  return (
    <header>
      <Row className="nav">
        <Col style={{ height: 100, display: "flex" }} flex="auto">
          {menuChild}
        </Col>
        {authUser && (
          <Col flex="0 1 300px">
            <Card
              styles={{
                // use for clasName = "ant-card-meta" of Card.Meta
                header: { color: "#fefefe" },
                body: { color: "#fefefe", fontWeight: "bold" },
                title: { color: "#f3e" },
              }}
              className="nav card"
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <LogoutOutlined onClick={handleSignOut} key={"signOut"} />,
              ]}
            >
              <Card.Meta
                prefixCls="ant-card-meta"
                avatar={
                  <Avatar
                    size={64}
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                  />
                }
                title="User"
                description={auth?.email}
              />
            </Card>
          </Col>
        )}
      </Row>
      {/* <Row gutter={1000}>
        <Col offset={1} span={12}>
          <Button onClick={showLoginModal}>Login</Button>
          <LoginModal
            visible={isLoginModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </Col>
        <Col span={11}>
          <Button onClick={showRegisterModal}>Register</Button>
          <RegisterModal
            visible={isRegisterModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </Col>
      </Row> */}
    </header>
  );
}

export default Header;
