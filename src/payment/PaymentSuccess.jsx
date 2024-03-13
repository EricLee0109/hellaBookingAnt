import React from "react";
import { Layout, Steps } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

const { Content } = Layout;

const PaymentSuccess = () => {
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
          <Steps current={2} className="progress-bar">
            <Steps.Step title="Fill in information" status="finish" />
            <Steps.Step title="Payment" status="finish" />
            <Steps.Step title="Confirmation" status="finish" />
          </Steps>
          <div className="site-layout-content">
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
            <div style={{ textAlign: "center" }}>
              <h2>Your payment is successful!</h2>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default PaymentSuccess;
