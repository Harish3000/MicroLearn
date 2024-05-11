import React, { useEffect, useState } from "react";
import { Table, Button, notification, Modal } from "antd";

function PaymentData() {
  const [data, setData] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedPaymentID, setSelectedPaymentID] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    fetch("/transaction/payments")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleConfirm = (paymentID, email) => {
    setSelectedPaymentID(paymentID);
    setSelectedEmail(email);
    setConfirmModalVisible(true);
  };

  const handleSendEmail = async () => {
    setLoading(true); // Set loading state to true when sending email
    const emailData = {
      receiver: selectedEmail,
      title: "Payment confirmed",
      message: "Your payment is confirmed by admin",
      details: {
        paymentID: selectedPaymentID,
        courseId: data.find((item) => item.paymentID === selectedPaymentID)
          .courseId,
        userId: data.find((item) => item.paymentID === selectedPaymentID)
          .userId,
        learnerName: data.find((item) => item.paymentID === selectedPaymentID)
          .learnerName,
        amount: data.find((item) => item.paymentID === selectedPaymentID)
          .amount,
        date: data.find((item) => item.paymentID === selectedPaymentID).date,
      },
    };

    try {
      const response = await fetch("/transaction/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        notification.success({
          message: "Email sent successfully!",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      notification.error({
        message: "Failed to send email",
      });
    } finally {
      setLoading(false); // Set loading state back to false
      setConfirmModalVisible(false);
    }
  };

  const handleDecline = (paymentID) => {
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
          onClick={() => handleConfirm(record.paymentID, record.email)}
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
      <Modal
        title="Confirmation"
        visible={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setConfirmModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="send"
            type="primary"
            loading={loading} // Added loading state
            onClick={handleSendEmail}
          >
            Send
          </Button>,
        ]}
      >
        Are you sure you want to send confirmation email?
      </Modal>
    </div>
  );
}

export default PaymentData;
