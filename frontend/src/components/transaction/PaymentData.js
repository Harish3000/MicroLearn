import React, { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";

function PaymentData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/transaction/payments")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleConfirm = (paymentID) => {
    // Handle confirm logic here
    notification.success({
      message: `Payment ID ${paymentID} confirmed successfully!`,
    });
  };

  const handleDecline = (paymentID) => {
    // Handle decline logic here
    notification.error({
      message: `Payment ID ${paymentID} declined!`,
    });
  };

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentID",
      key: "paymentID",
    },
    {
      title: "Course ID",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Learner Name",
      dataIndex: "learnerName",
      key: "learnerName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Confirm",
      key: "confirm",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleConfirm(record.paymentID)}
          className="bg-blue-500 hover:bg-blue-700"
        >
          Confirm
        </Button>
      ),
    },
    {
      title: "Decline",
      key: "decline",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDecline(record.paymentID)}
          className="bg-red-500 hover:bg-red-700"
        >
          Decline
        </Button>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-3/4 p-10 bg-white rounded shadow-xl">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="paymentID"
          scroll={{ y: 500 }}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default PaymentData;
