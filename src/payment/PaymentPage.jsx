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
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "react-toastify";

const { Content } = Layout;
const { Option } = Select;

const PaymentPage = ({ onSubmitPayment }) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [vnPayment, setVnPayment] = useState("");
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

  const totalPriceBe = tourData.price * totalCustomer;
  const getTotalPrice = () => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(tourData.price * totalCustomer);
  };
  const getTripById = tripsData.find((trip) => trip.id === tripId);
  console.log(getTripById, "getTripbyId");
  console.log(tourData, "tourData");

  //data post
  console.log(getTripById?.createAt, "cre");
  console.log(startDate, "st");
  console.log(endDate, "ed");
  console.log(totalPriceBe, "price");
  console.log(tripId, "tripid");
  console.log(totalCustomer, "cus");
  const onFinish = (values) => {
    axios
      .post(BOOKING_URL, {
        bookingDate: getTripById?.createAt,
        fromDate: startDate,
        toDate: startDate,
        userId: userId,
        totalAmount: totalPriceBe,
        status: true,
        tripId: tripId,
        totalCustomer: totalCustomer,
      })
      .then((res) => {
        toast("Your payment result!");
        console.log("--------------Booking-----------------");
        console.log(values.paymentMethod, "paymentMethod");
        console.log(values.language, "language");
        console.log(res.data.data, "res Booking");
        console.log(res.data.data.id, "res Booking");
        console.log(res.data.data.bookingDate, "res Booking");
        console.log(totalPriceBe, "res Booking");

        axios
          .post(
            "/create_vnpayment",
            {
              bookingId: res.data.data.id,
              bankCode: values.paymentMethod,
              language: values.language,
              descript: "Your booking is successfully!",
            },
            {
              headers: {
                userId: userId,
              },
            }
          )
          .then((res) => {
            // navigate("/paymentSuccess");
            console.log("--------------Payment-----------------");
            console.log(res.data, "res vnPayment");
            if (res.data) {
              window.open(res.data, "_blank");
            }
            // axios
            //   .get("/vnpay_ipn", { params: { vnPay: res.data } })
            //   .then((res) => {
            //     console.log(res.data, "res GET Param Vnpay");
            //     if (res.data.RspCode === "97") {
            //       redirect("/paymentSuccess");
            //     }
            //   });

            // axios
            //   .get("/vnpay_ipn", { params: { vnPay: res.data.RspCode } })
            //   .then((res) => {
            //     navigate("/paymentSuccess", { state: res.data });
            //     console.log(res.data.RspCode, "res GET Param Vnpay IPN");
            //   });
            // navigate("/paymentProcess", { state: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
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
                {getTotalPrice()}
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
                  <Option key="VNBANK" value="VNBANK">
                    Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                  </Option>
                  <Option key="INTCARD" value="INTCARD">
                    Thanh toán qua thẻ quốc tế
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="language"
                label="Select Language"
                rules={[
                  {
                    required: true,
                    message: "Please select your languages!",
                  },
                ]}
              >
                <Select placeholder="Select your languages">
                  <Option key="vn" value="vn">
                    Tiếng Việt
                  </Option>
                  <Option key="en" value="en">
                    English
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  // onClick={showConfirmModal}
                  htmlType="submit"
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
                {vnPayment && <a href={vnPayment}>Pay your bills here!</a>}
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
