import {
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  LoadingOutlined,
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
  Spin,
  Tabs,
  message,
  theme,
} from "antd";
// import hellaLogo from "../../img/hellaBookingLogo.png";
// import hellaVideo from "../../img/hellaBookingVideo.mp4";
// import travelVideo from "../../img/travelEarth.mp4";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { redirect, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useState } from "react";
import TabPane from "antd/es/tabs/TabPane";
import { createGlobalStyle } from "antd-style";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginGoogle from "../../googleSignIn/LoginGoogle";

const iconStyles = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

// const GlobalStyle = createGlobalStyle`
//   .ant-form {
//     background: rgba(255, 255, 255, 0.1) !important;
//   }
// `;

const Page = () => {
  const [accessType, setAccessType] = useState("login");
  // const [loginSuccess, setLoginSucess] = useState(false);
  const { token } = theme.useToken();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const registerMess = () => {
  //   messageApi.open({
  //     type: "success",
  //     content: "Register Successful!",
  //   });
  //   setTimeout(messageApi.destroy, 2500);
  // };

  // const values = {
  //   email: "dmtan1510@gmail.com",
  //   password: "tan15102002",
  // };
  const handleFinish = (values) => {
    setLoading(true);
    console.log(values);
    {
      accessType === "login";
    }
    toast("Processing...");
    axios
      .post(accessType === "login" ? "/signIn" : "/signUp", values)
      .then((res) => {
        console.log("res: ", res);
        toast.dismiss();
        signIn({
          auth: {
            token: res.data.token.accessToken,
            type: "Bearer",
          },
          // refresh: res.data.token.refreshToken,
          userState: { email: values.email, id: res.data.userData.id },
        });

        // setIsLoginModalVisible(false);
        if (res.data.statusCode === 200 && accessType === "login") {
          //login success
          toast(res.data.status);
          navigate("/");
        } else if (res.data.statusCode === 409 && accessType === "login") {
          toast(res.data.message);
        } else if (res.data.statusCode === 201 && accessType === "register") {
          //register success
          window.location.reload();
          toast(res.data.status);
        } else if (res.data.stautsCode === 500 && accessType === "register") {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          toast(err.response.data.message);
        }
        // toast(accessType === "login" ? "Login failed!" : "Register failed!");
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
      {/* <GlobalStyle /> */}
      <LoginFormPage
        className="login-form-page"
        submitter={{
          searchConfig: {
            submitText:
              (accessType === "login" || accessType === "register") &&
              loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "#fefefe" }}
                      spin
                    />
                  }
                />
              ) : // <LoadingOutlined />
              accessType === "login" ? (
                "Sign In"
              ) : (
                "Sign up"
              ),
          },
        }}
        onFinish={handleFinish}
        backgroundImageUrl="https://img.hotimg.com/landingPageHeader.png"
        logo={
          "https://res.cloudinary.com/dtlvihfka/image/upload/v1709178491/ekmd80ee6du84b0nptld.png"
        }
        backgroundVideoUrl="https://res.cloudinary.com/dtlvihfka/video/upload/v1709136621/wltb11xxwqzynxprr8l6.mp4"
        title="Hella"
        subTitle="Nowhere for who interested in travel and tour"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
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
          accessType === "login" && (
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
                {/* <div
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
                  <FacebookOutlined
                    style={{ ...iconStyles, color: "#1677FF" }}
                  />
                </div> */}
                <LoginGoogle />
                {/* <div
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
                </div> */}
              </Space>
            </div>
          )
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
        {/* {loginSuccess && (
          <Alert
            style={{ marginBottom: 10 }}
            message="Login Successful!"
            description="Please wait for a minute!"
            type="success"
            showIcon
            />
          )} */}
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
