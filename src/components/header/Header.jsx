import { Avatar, Button, Card, Col, Row, Tooltip } from "antd";
import { header } from "../data";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
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

  /* image 7 */

  // const showLoginModal = () => {
  //   setIsLoginModalVisible(!isLoginModalVisible);
  // };

  // const handleCancel = () => {
  //   setIsLoginModalVisible(false);
  //   setIsRegisterModalVisible(false);
  // };

  const filteredTitleData = authUser
    ? header.filter(
        (userAuth) =>
          userAuth.title === "Tour" ||
          userAuth.title === "Tour Guide" ||
          userAuth.title === "User"
      )
    : header.filter(
        (user) =>
          user.title === "Tour" ||
          user.title === "Tour Guide" ||
          user.title === "Login"
      );

  const handleClickLogin = () => {
    navgiate("/login");
  };

  const userTooltip = authUser && (
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
          style={{
            color: "#1677ff",
            background: "#f9f9f9",
            backdropFilter: "blur(10px)",
          }}
          prefixCls="ant-card-meta"
          avatar={
            <Avatar
              style={{ background: "#85a5ff" }}
              size={64}
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
            />
          }
          // title="User"
          description={auth?.email}
        />
      </Card>
    </Col>
  );

  const menuChild = filteredTitleData.map((item, i) => {
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
      <Col key={i.toString()} span={8}>
        <Tooltip
          title={item.title === "User" ? userTooltip : content}
          placement="bottom"
          overlayClassName="header-tip-wrap"
        >
          <span
            onClick={
              (item.title === "Login" || item.title === "Register") &&
              handleClickLogin
            }
            className="nav-title"
          >
            {item.title}
          </span>
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
