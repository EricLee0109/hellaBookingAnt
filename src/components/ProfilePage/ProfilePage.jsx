import React from "react";
import { Layout, Menu, Breadcrumb, Card, Avatar, Rate } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

const ProfilePage = () => {
  const navigate = useNavigate();

  const userProfile = {
    name: "Dr. Stephen Conley",
    role: "Cardiologist",
    rating: 4.5,
    trust: 95,
    specialties: ["Clinical & Interventional Cardiologist", "Heart Specialist"],
    designation: "Professor of Cardiac Surgery",
    department: "Cardiology (Heart)",
  };

  const handleSettingClick = () => {};

  const handleEditClick = () => {};

  return (
    <Layout>
      <Sider>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}></Menu>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}></Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}></Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Card
              style={{ width: 300, margin: "0 16px 16px 0" }}
              cover={
                <img
                  alt="example"
                  src="https://i.pinimg.com/236x/6c/03/bd/6c03bd85b33bca97e0f3bb7bf50242e2.jpg"
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                />
              }
              actions={[
                <SettingOutlined key="setting" onClick={handleSettingClick} />,
                <EditOutlined key="edit" onClick={handleEditClick} />,
              ]}
            >
              <Meta
                avatar={<Avatar src="path_to_avatar" />}
                title={userProfile.name}
                description={userProfile.role}
              />
              <Rate disabled defaultValue={userProfile.rating} />
            </Card>
            <Card
              style={{ width: 300, margin: "0 16px 16px 0" }}
              cover={
                <img
                  alt="example"
                  src="https://i.pinimg.com/236x/cd/5c/4a/cd5c4a8cc2ded829dbdde03fd4855327.jpg"
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                />
              }
              actions={[
                <SettingOutlined key="setting" onClick={handleSettingClick} />,
                <EditOutlined key="edit" onClick={handleEditClick} />,
              ]}
            >
              <Meta
                avatar={<Avatar src="path_to_avatar" />}
                title={userProfile.name}
                description={userProfile.role}
              />
              <Rate disabled defaultValue={userProfile.rating} />
            </Card>
            <Card
              style={{ width: 300, margin: "0 16px 16px 0" }}
              cover={
                <img
                  alt="example"
                  src="https://i.pinimg.com/564x/a1/8a/10/a18a106fbc97ff3acaf1463287a29985.jpg"
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                />
              }
              actions={[
                <SettingOutlined key="setting" onClick={handleSettingClick} />,
                <EditOutlined key="edit" onClick={handleEditClick} />,
              ]}
            >
              <Meta
                avatar={<Avatar src="path_to_avatar" />}
                title={userProfile.name}
                description={userProfile.role}
              />
              <Rate disabled defaultValue={userProfile.rating} />
            </Card>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
