import React, { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    paymentID: "",
    type: "",
    userId: "",
    learnerName: "",
    email: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10), // Today's date
    courseId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform validation here before sending the data
    fetch("/transaction/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => {
        if (response.ok) {
          notification.success({
            message: "Success!. Redirecting...",
            duration: 2,
          });
          setTimeout(() => {
            navigate("/transaction/card");
          }, 3000);
        } else {
          throw new Error("Failed to submit payment");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting payment:", error);
        notification.error({
          message: "Payment Submission Failed",
          description: "Please try again later.",
        });
      });
  };

  const handleCancel = () => {
    // Perform any necessary action for cancelling, such as going back to the previous page
    window.history.back();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white rounded-lg p-8 shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Payment Details</h2>
        <div className="mb-4">
          <label htmlFor="paymentID" className="block text-gray-700">
            Payment ID
          </label>
          <input
            type="text"
            id="paymentID"
            name="paymentID"
            value={paymentData.paymentID}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={paymentData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={paymentData.userId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="learnerName" className="block text-gray-700">
            Learner Name
          </label>
          <input
            type="text"
            id="learnerName"
            name="learnerName"
            value={paymentData.learnerName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={paymentData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-gray-700">
            Course ID
          </label>
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={paymentData.courseId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={paymentData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="mr-4 py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
