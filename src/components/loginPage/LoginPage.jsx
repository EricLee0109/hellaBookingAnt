import {
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  ManOutlined,
  PhoneOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  LoginFormPage,
  ProConfigProvider,
  ProForm,
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import {
  Alert,
  Button,
  Divider,
  Form,
  Space,
  Tabs,
  message,
  theme,
} from "antd";
import hellaLogo from "../../img/hellaBookingLogo.png";
// import hellaVideo from "../../img/hellaBookingVideo.mp4";
// import travelVideo from "../../img/travelEarth.mp4";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useState } from "react";
import TabPane from "antd/es/tabs/TabPane";

const iconStyles = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const Page = () => {
  const [accessType, setAccessType] = useState("login");
  const [loginSuccess, setLoginSucess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const registerSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Register Successful!",
    });
  };

  // const values = {
  //   email: "dmtan1510@gmail.com",
  //   password: "tan15102002",
  // };
  const handleFinish = (values) => {
    console.log(values);
    {
      accessType === "login";
    }
    axios
      .post(accessType === "login" ? "/signIn" : "/signUp", values)
      .then((res) => {
        console.log("res: ", res);
        if (res.status === 201) {
          signIn({
            auth: {
              token: res.data.token.accessToken,
              type: "Bearer",
            },
            // refresh: res.data.token.refreshToken,
            userState: { email: values.email },
          });
          console.log("Login success");
        }
        // setIsLoginModalVisible(false);
        if (isAuthenticated) {
          registerSuccess();
          navigate(accessType === "login" && "/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const genderPrefix = (
    <>
      <ManOutlined
        style={
          {
            // color: token.colorText,
          }
        }
        className={"prefixIcon"}
      />
      <WomanOutlined
        style={
          {
            // color: token.colorText,
          }
        }
        className={"prefixIcon"}
      />
    </>
  );
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      {contextHolder}
      <LoginFormPage
        submitter={{ searchConfig: { submitText: "Login" } }}
        onFinish={handleFinish}
        backgroundImageUrl="https://img.hotimg.com/landingPageHeader.png"
        logo={
          "https://res.cloudinary.com/dtlvihfka/image/upload/v1709178491/ekmd80ee6du84b0nptld.png"
        }
        backgroundVideoUrl="https://res.cloudinary.com/dtlvihfka/video/upload/v1709136621/wltb11xxwqzynxprr8l6.mp4"
        title="Hella"
        subTitle="Nowhere for who interested in travel and tour"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        // activityConfig={{
        //   style: {
        //     boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        //     color: token.colorTextHeading,
        //     borderRadius: 8,
        //     backgroundColor: "rgba(255,255,255,0.25)",
        //     backdropFilter: "blur(4px)",
        //   },
        //   title: "活动标题，可配置图片",
        //   subTitle: "活动介绍说明文字",
        //   action: (
        //     <Button
        //       size="large"
        //       style={{
        //         borderRadius: 20,
        //         background: token.colorBgElevated,
        //         color: token.colorPrimary,
        //         width: 120,
        //       }}
        //     >
        //       去看看
        //     </Button>
        //   ),
        // }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: "normal",
                  fontSize: 14,
                }}
              >
                Sign In as
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
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
                <FacebookOutlined style={{ ...iconStyles, color: "#1677FF" }} />
              </div>
              <div
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
              <div
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
                <GithubOutlined style={{ ...iconStyles, color: "#1890ff" }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={accessType}
          onChange={(activeKey) => setAccessType(activeKey)}
        >
          <TabPane key={"login"} tab={"Login"} />
          <TabPane key={"register"} tab={"Register"} />
        </Tabs>
        {accessType === "login" && (
          <>
            <ProFormText
              key="email"
              name="email"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Email"}
              rules={[
                {
                  required: true,
                  message: "Your email is required!",
                },
              ]}
            />
            <ProFormText.Password
              key="password"
              name="password"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Password"}
              rules={[
                {
                  required: true,
                  message: "Your password is required!",
                },
              ]}
            />
          </>
        )}
        {accessType === "register" && (
          <>
            <ProFormText
              key="email"
              name="email"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Email"}
              rules={[
                {
                  required: true,
                  message: "Your email is required!",
                },
              ]}
            />
            <ProFormText
              key="phone"
              name="phone"
              fieldProps={{
                size: "large",
                prefix: (
                  <PhoneOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Phone"}
              rules={[
                {
                  required: true,
                  message: "Your phone is required!",
                },
              ]}
            />
            <ProFormText
              key="fullName"
              name="fullName"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Full name"}
              rules={[
                {
                  required: true,
                  message: "Your full name is required!",
                },
              ]}
            />
            <ProFormText.Password
              key="password"
              name="password"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Password"}
              rules={[
                {
                  required: true,
                  message: "Your password is required!",
                },
              ]}
            />
            <ProFormText
              key="gender"
              name="gender"
              fieldProps={{
                size: "large",
                prefix: genderPrefix,
              }}
              placeholder={"Gender"}
              rules={[
                {
                  required: true,
                  message: "Your gender is required!",
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            Remember Me
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            Forget password
          </a>
        </div>
        {loginSuccess && (
          <Alert
            style={{ marginBottom: 10 }}
            message="Login Successful!"
            description="Please wait for a minute!"
            type="success"
            showIcon
          />
        )}
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
