import React, { useState } from "react";
import {
  Layout,
  Form,
  InputNumber,
  Select,
  Button,
  message,
  Steps,
  Modal,
} from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

const PaymentPage = ({ onSubmitPayment }) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const onFinish = () => {
    if (!paymentMethod) {
      message.error("Please select your payment method!");
      return;
    }

    const paymentDetails = {
      amount: paymentAmount,
      paymentMethodId: paymentMethod,
    };

    onSubmitPayment(paymentDetails);
    setCurrentStep(currentStep + 1);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirm = () => {
    onFinish();
    setConfirmModalVisible(false);
  };

  const handleCancel = () => {
    setConfirmModalVisible(false);
  };

  return (
    <Layout className="layout">
      <Content style={{ marginTop: 64 }}>
        <div
          className="booking-form"
          style={{
            marginBottom: 50,
            maxWidth: "100%",
            padding: 20,
            marginRight: 50,
            marginLeft: 70,
          }}
        >
          <Steps current={currentStep} className="progress-bar">
            <Steps.Step
              title="Fill in information"
              status={currentStep === 1 ? "finish" : "process"}
            />
            <Steps.Step title="Payment" />
            <Steps.Step title="Confirmation" />
          </Steps>
          <div className="site-layout-content">
            <Form
              id="payment-form"
              layout="vertical"
              onFinish={onFinish}
              style={{ maxWidth: 600, margin: "0 auto" }}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  marginBottom: "30px",
                  color: "#1890ff",
                }}
              >
                <CreditCardOutlined style={{ marginRight: "10px" }} />
                Payment Information
              </h2>

              <Form.Item label="Amount to Pay">
                <InputNumber
                  value={paymentAmount}
                  onChange={setPaymentAmount}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[
                  {
                    required: true,
                    message: "Please select your payment method!",
                  },
                ]}
              >
                <Select
                  onChange={handlePaymentMethodChange}
                  placeholder="Select a payment method"
                >
                  <Option value="creditCard">Credit Card</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="bankTransfer">Bank Transfer</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={showConfirmModal}
                  style={{
                    width: "100%",
                    backgroundColor: "#FFA500",
                    borderColor: "#FFA500",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Make Payment
                </Button>
              </Form.Item>
            </Form>
          </div>
          <Modal
            title="Confirm Payment"
            visible={confirmModalVisible}
            onOk={handleConfirm}
            onCancel={handleCancel}
          >
            <p>Are you sure you want to make this payment?</p>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default PaymentPage;
