import React, { useState } from "react";
import { notification, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  const [cardData, setCardData] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    month: "",
    year: "",
    ccv: "",
  });

  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    // Remove all non-numeric characters
    value = value.replace(/\D/g, "");
    // Add dash after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1-");
    // Limit the length to 19 characters
    value = value.substr(0, 19);
    setCardData({ ...cardData, cardNumber: value });
  };

  const handleCCVChange = (e) => {
    let { value } = e.target;
    // Remove all non-numeric characters
    value = value.replace(/\D/g, "");
    // Limit the length to 3 characters
    value = value.substr(0, 3);
    setCardData({ ...cardData, ccv: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform validation here before sending the data
    if (
      cardData.firstName &&
      cardData.lastName &&
      cardData.cardNumber &&
      cardData.month &&
      cardData.year &&
      cardData.ccv
    ) {
      navigate("/transaction/success");
    } else {
      notification.error({
        message: "Please fill out all fields",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white rounded-lg p-8 shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Card Details</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={cardData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={cardData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleCardNumberChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            maxLength="19"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="month" className="block text-gray-700">
            Month
          </label>
          <DatePicker
            onChange={(date, dateString) =>
              setCardData({ ...cardData, month: dateString })
            }
            picker="month"
            format="MM"
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700">
            Year
          </label>
          <DatePicker
            onChange={(date, dateString) =>
              setCardData({ ...cardData, year: dateString })
            }
            picker="year"
            className="mt-1 block w-full rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ccv" className="block text-gray-700">
            CCV Number
          </label>
          <input
            type="text"
            id="ccv"
            name="ccv"
            value={cardData.ccv}
            onChange={handleCCVChange}
            className="mt-1 block w-1/12 rounded-md border-gray-400 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            maxLength="3"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Card;
