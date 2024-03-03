import { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const RegisterModal = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal
      title="Register"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="Username"
          name="name"
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

        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Select name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
