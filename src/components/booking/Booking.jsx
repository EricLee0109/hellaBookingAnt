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

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Step } = Steps;
const { Content } = Layout;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Layout className="layout">
      <Content style={{ marginTop: 64 }}>
        <div className="site-layout-content">
          <Form
            id="booking-form"
            style={{ marginBottom: 20, maxWidth: "100%", padding: 0 }}
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
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "20px",
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
              <div className="input-container">
                <Form.Item
                  name="adultCount"
                  rules={[
                    {
                      required: true,
                      message: "Please input the number of adults!",
                    },
                  ]}
                >
                  <InputNumber min={0} placeholder="Adult" />
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  name="childCount"
                  rules={[
                    {
                      required: true,
                      message: "Please input the number of children!",
                    },
                  ]}
                >
                  <InputNumber min={0} placeholder="Child" />
                </Form.Item>
              </div>
              <div className="input-container">
                <Form.Item
                  name="guide"
                  rules={[
                    { required: true, message: "Please select a guide!" },
                  ]}
                >
                  <Select placeholder="Select Guide">
                    <Option value="John Doe">John Doe</Option>
                    <Option value="Jane Smith">Jane Smith</Option>
                    <Option value="David Johnson">David Johnson</Option>
                  </Select>
                </Form.Item>
              </div>
              <div
                className="summary-container"
                style={{ textAlign: "center" }}
              >
                <p style={{ color: "red" }}>Total Price: ${totalPrice}</p>

                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => bookingNavigate("/payment")}
                >
                  Booking Now
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default BookingPage;
