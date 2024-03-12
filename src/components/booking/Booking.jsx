import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Select,
  Button,
  Steps,
} from "antd";
import { FireFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Step } = Steps;
const { Content } = Layout;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const navigate = useNavigate();

  const bookingNavigate = () => {
    navigate("/payment");
  };

  return (
    <Layout className="layout">
      <Content style={{ marginTop: 64 }}>
        <div className="site-layout-content">
          <Form
            id="booking-form"
            style={{
              marginBottom: 50,
              maxWidth: "100%",
              padding: 50,
              marginRight: 50,
              marginLeft: 70,
            }}
            name="booking"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div
              className="booking-form"
              style={{ maxWidth: "auto", margin: "auto" }}
            >
              <Steps current={currentStep} className="progress-bar">
                <Steps.Step
                  title="Fill in information"
                  status={currentStep === 0 ? "finish" : "process"}
                />
                <Steps.Step title="Payment" />
                <Steps.Step title="Confirmation" />
              </Steps>

              <div className="input-container">
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "1.75rem",
                    fontWeight: "bold",
                    marginBottom: "30px",
                    color: "#1890ff",
                  }}
                >
                  <FireFilled style={{ marginRight: "10px" }} />
                  Booking Tour
                </h1>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  name="date"
                  rules={[{ required: true, message: "Please select a date!" }]}
                >
                  <RangePicker />
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  name="time"
                  rules={[{ required: true, message: "Please select a time!" }]}
                >
                  <TimePicker format="HH:mm" minuteStep={15} />
                </Form.Item>
              </div>

              <div
                className="summary-container"
                style={{ textAlign: "center" }}
              >
                <div
                  className="summary-container"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    type="primary"
                    onClick={bookingNavigate}
                    style={{
                      backgroundColor: "#FFA500",
                      borderColor: "#FFA500",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    className="booking-button"
                  >
                    Booking Now
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default BookingPage;
