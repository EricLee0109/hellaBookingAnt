import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState({
    amount: "",
    orderDescription: "",
  });
  const [paymentResult, setPaymentResult] = useState(null);
  const navigate = useNavigate();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1410/api/v1/create_vnpayment",
        {
          ...paymentData,
          bankCode: "VNPAYQR",
          orderType: "mua ban",
          language: "vn",
        }
      );

      setPaymentResult(response.data);
    } catch (error) {
      console.error("Error during payment:", error);
      setPaymentResult(null);
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            placeholder="Amount"
            value={paymentData.amount}
            onChange={(e) =>
              setPaymentData({ ...paymentData, amount: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Order Description:</label>
          <input
            type="text"
            placeholder="Order Description"
            value={paymentData.orderDescription}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                orderDescription: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" className="button">
          Pay Now
        </button>
      </form>

      {paymentResult && (
        <div className="result">
          <p>Payment Status: {paymentResult.status}</p>
          <p>Message: {paymentResult.message}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
