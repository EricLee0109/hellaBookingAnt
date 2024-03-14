import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  DatePicker,
  Row,
  Col,
  Modal,
  Form,
  Popconfirm,
  message,
  Card,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const PaymentHistory = () => {
  const [paymentHistoryData, setPaymentHistoryData] = useState([
    { key: "1", date: "2023-01-01", type: "Credit Card", status: "success" },
    { key: "2", date: "2023-01-05", type: "PayPal", status: "failed" },
    { key: "3", date: "2023-01-10", type: "Bank Transfer", status: "success" },
    { key: "4", date: "2023-01-15", type: "Credit Card", status: "success" },
    { key: "5", date: "2023-01-20", type: "Credit Card", status: "failed" },
    { key: "6", date: "2023-01-25", type: "PayPal", status: "success" },
  ]);

  const [filteredData, setFilteredData] = useState(paymentHistoryData);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [form] = Form.useForm();

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleAdd = (values) => {
    const newData = {
      key: `${paymentHistoryData.length + 1}`,
      ...values,
    };
    setPaymentHistoryData([...paymentHistoryData, newData]);
    setFilteredData([...filteredData, newData]); // Update filtered data
    setIsAddModalVisible(false);
  };

  const handleEdit = (values) => {
    const updatedData = paymentHistoryData.map((item) => {
      if (item.key === currentRecord.key) {
        return { ...item, ...values };
      }
      return item;
    });
    setPaymentHistoryData(updatedData);
    setFilteredData(updatedData); // Update filtered data
    setIsEditModalVisible(false);
  };

  const handleDelete = (key) => {
    const newData = paymentHistoryData.filter((item) => item.key !== key);
    setPaymentHistoryData(newData);
    setFilteredData(newData); // Update filtered data
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);

    const filtered = paymentHistoryData.filter((record) =>
      Object.values(record).some(
        (item) =>
          item && item.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );

    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 110%)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Card title={<span style={{ color: "#000080" }}>Payment History</span>}>
        <Space style={{ marginBottom: 16 }}>
          <RangePicker />
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
            style={{
              color: "#FFFFFF",
              backgroundColor: "#000080",
              border: "none",
            }}
          >
            Add
          </Button>
        </Space>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="key"
              pagination={{ pageSize: 10 }}
            />
          </Col>
        </Row>

        <Modal
          title="Add Payment Record"
          visible={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAdd}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please input the date!" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please input the type!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please input the status!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* Edit Modal */}
        <Modal
          title="Edit Payment Record"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleEdit}
            initialValues={{
              date: currentRecord?.date,
              type: currentRecord?.type,
              status: currentRecord?.status,
            }}
          >
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please input the date!" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please input the type!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please input the status!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ color: "#000080" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default PaymentHistory;
