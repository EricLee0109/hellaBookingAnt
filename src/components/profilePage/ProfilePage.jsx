import React, { useEffect, useState } from "react";
import {
  Layout,
  Avatar,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Row,
  Space,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  LockOutlined,
  FileImageOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
  PropertySafetyOutlined,
} from "@ant-design/icons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

const { Content } = Layout;
const { Title, Text } = Typography;

function ProfilePage() {
  const [form] = Form.useForm();
  const authUser = useAuthUser();
  const userId = authUser.id;
  const USER_URL = "/users";
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    image: "",
    gender: "",
    password: "",
    phone: "",
    roleId: null,
  });
  // console.log(userProfile, "userProfile");
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
    axios
      .patch(USER_URL + `/${userId}`, {
        id: userId,
        // password: values.password,
        // email: values.email,
        fullName: values.fullName,
        gender: values.gender,
        phone: values.phone,
        image: values.image,
      })
      .then((res) => {
        toast("Update profile successfully!");
        console.log(res, "res Updateee");
      })
      .catch((err) => console.log(err, "err"));
  };

  const cardStyle = {
    borderRadius: "10px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
  };

  useEffect(() => {
    // Call API to get user information
    axios
      .get(USER_URL + `/${userId}`)
      .then((res) => {
        setUserData(res.data.data);
        console.log(userData, "userData");
      })
      .catch((err) => console.log(err, "err User"));
    form.setFieldsValue({
      fullName: userData.fullName,
      email: userData.email,
      image: userData.image,
      gender: userData.gender,
      password: userData.password,
      phone: userData.phone,
      roleId: userData.roleId,
    });
  }, [userData._id, form]);
  let checkPass = bcrypt.compareSync(
    "khoa0109",
    "$2a$10$djyvlxzbX8MEriB4ErJT5eHWP3l/OfUVqCblLaD3aGT.Au1I97tnC"
  );
  // result will be true if the passwords match, false otherwise
  console.log(checkPass, "Pass check");
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
            <Avatar size={64} src={userData.image} icon={<UserOutlined />} />
            <div style={{ flexGrow: 1, marginLeft: "20px" }}>
              <Title level={2} style={{ marginBottom: "8px" }}>
                {userData.fullName}
              </Title>
              <Text type="secondary">{userData.email}</Text>
            </div>
            {!editMode && ( // Hiển thị nút chỉnh sửa nếu không ở chế độ chỉnh sửa
              <Button
                icon={<EditOutlined />}
                type="primary"
                style={{
                  alignSelf: "end",
                  width: "150px",
                }}
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <Form
            style={{ maxWidth: "100%" }}
            form={form}
            layout="vertical"
            // onValuesChange={handleFormChange}
            onFinish={handleFormSubmit}
            // initialValues={userProfile}
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
                prefix={<UserOutlined />}
                disabled={!editMode} // Không cho chỉnh sửa nếu không ở chế độ chỉnh sửa
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email address!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} disabled={true} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} disabled={true} />
            </Form.Item>
            <Form.Item
              label="Avatar Image"
              name="image"
              // rules={[
              //   { required: true, message: "Please input your image!" },
              // ]}
            >
              <Input prefix={<FileImageOutlined />} disabled={!editMode} />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} disabled={!editMode} />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please input your gender!" }]}
            >
              <Input
                prefix={
                  <>
                    <ManOutlined />
                    <WomanOutlined />
                  </>
                }
                disabled={!editMode}
              />
            </Form.Item>
            <Form.Item
              label="Role"
              name="roleId"
              rules={[
                { required: true, message: "Please input your role ID!" },
              ]}
            >
              <Input prefix={<PropertySafetyOutlined />} disabled={true} />
            </Form.Item>
            {editMode && (
              <Space direction="horizontal" size={180}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => setEditMode(false)}
                  style={{
                    width: "100%",
                    backgroundColor: "#f5222d",
                    borderColor: "#f5222d",
                  }}
                >
                  Back
                </Button>
                {/* <div style={{ width: 20 }} /> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#52c41a",
                    borderColor: "#52c41a",
                  }} // A green submit button
                >
                  Update Profile
                </Button>
              </Space>
            )}
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}

export default ProfilePage;
