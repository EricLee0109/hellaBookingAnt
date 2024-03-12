import React, { useState } from "react";
import { Layout, Avatar, Card, Form, Input, Button, Typography } from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    fullName: "Cathy Chu",
    email: "cchu@myschool.edu",
    studentId: "stu123456",
  });
  const [editMode, setEditMode] = useState(false); // State để theo dõi trạng thái chỉnh sửa

  const handleFormChange = (changedValues, allValues) => {
    setUserProfile(allValues);
  };

  const handleEditClick = () => {
    setEditMode(true); // Kích hoạt chế độ chỉnh sửa
  };

  const handleFormSubmit = (values) => {
    console.log("Updated Profile:", values);
    setEditMode(false); // Tắt chế độ chỉnh sửa sau khi cập nhật thành công
  };

  const cardStyle = {
    borderRadius: "10px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content style={{ padding: "50px", maxWidth: "100%" }}>
        <Card bordered={false} style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              size={64}
              src="https://i.pinimg.com/236x/06/cd/66/06cd66bd82cddff2ba1cb8f2f4f6e92a.jpg"
              icon={<UserOutlined />}
            />
            <div style={{ flexGrow: 1, marginLeft: "20px" }}>
              <Title level={2} style={{ marginBottom: "8px" }}>
                {userProfile.fullName}
              </Title>
              <Text type="secondary">{userProfile.studentId}</Text>
            </div>
            {!editMode && ( // Hiển thị nút chỉnh sửa nếu không ở chế độ chỉnh sửa
              <Button
                icon={<EditOutlined />}
                style={{
                  alignSelf: "start",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  color: "white",
                }}
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <Form
            layout="vertical"
            onValuesChange={handleFormChange}
            onFinish={handleFormSubmit}
            initialValues={userProfile}
            hideRequiredMark={!editMode} // Ẩn điều kiện bắt buộc khi ở chế độ chỉnh sửa
          >
            <Title level={4}>Basic Information</Title>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                disabled={!editMode} // Không cho chỉnh sửa nếu không ở chế độ chỉnh sửa
              />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email address!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                disabled={!editMode}
              />
            </Form.Item>
            <Form.Item
              label="Student ID"
              name="studentId"
              rules={[
                { required: true, message: "Please input your student ID!" },
              ]}
            >
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                disabled={!editMode}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                disabled={!editMode}
              />
            </Form.Item>
            {editMode && (
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }} // A green submit button
              >
                Update Profile
              </Button>
            )}
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
