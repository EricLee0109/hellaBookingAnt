import React, { useEffect, useState } from "react";
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
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "react-toastify";

const { Content } = Layout;
const { Option } = Select;

const PaymentPage = ({ onSubmitPayment }) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [tripsData, setTripsData] = useState([]);
  const [tourData, setTourData] = useState({});
  const TOURS_URL = "/tours";
  const TRIPS_URL = "/trips";
  const BOOKING_URL = "/bookings";
  const authUser = useAuthUser();
  const userId = authUser?.id;
  const navigate = useNavigate();

  //
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const idTrip = queryParams.get("tripId");
  const tripId = Number(idTrip); //convert to number to compare with tripId in tripsData
  const tourId = queryParams.get("tourId");
  const customerTotal = queryParams.get("totalCustomer");
  const totalCustomer = Number(customerTotal);
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");

  // const getTotalPrice = () => {
  //   return new Intl.NumberFormat("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //     minimumFractionDigits: 0,
  //   }).format(tourData.price * totalCustomer * 1000);
  // };

  const getTotalPrice = tourData.price * totalCustomer * 1000;

  const getTripById = tripsData.find((trip) => trip.id === tripId);
  console.log(getTripById, "getTripbyId");
  console.log(tourData, "tourData");

  //data post
  console.log(getTripById?.createAt, "cre");
  console.log(startDate, "st");
  console.log(endDate, "ed");
  console.log(getTotalPrice, "price");
  console.log(tripId, "tripid");
  console.log(totalCustomer, "cus");
  const onFinish = () => {
    axios
      .post(BOOKING_URL, {
        bookingDate: getTripById.createAt,
        fromDate: startDate,
        toDate: startDate,
        userId: userId,
        totalAmount: getTotalPrice,
        status: true,
        tripId: tripId,
        totalCustomer: totalCustomer,
      })
      .then((res) => {
        toast("Booking successfully!");
        console.log(res, "res");
        navigate("/paymentSuccess");
      })
      .catch((err) => {
        toast("Booking Failed!");
        console.log(err);
      });
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

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripsRes, tourRes] = await Promise.all([
          // axios.get(TRIPS_URL + `/${tripId}`), // Can't return trip
          axios.get(TRIPS_URL),
          axios.get(TOURS_URL + `/${tourId}`),
        ]);
        setTripsData(tripsRes.data.data);
        setTourData(tourRes.data.data);
        // // Find the booking after setting bookingData
        // const getBookingByTripId = bookingRes.data.data.find(
        //   (booking) => booking.tripId === tripId
        // );
        // console.log(getBookingByTripId, "getBookingByTripId");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

              <Form.Item name="amount" label="Amount to Pay">
                {getTotalPrice}
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
                <Select placeholder="Select a payment method">
                  <Option key="vnpay" value="vnpay">
                    VnPay
                  </Option>
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
