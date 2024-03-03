import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

const LoginModal = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal title="Login" open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
