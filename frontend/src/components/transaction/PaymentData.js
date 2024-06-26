import React, { useEffect, useState } from "react";
import { Table, Button, notification, Modal, Spin } from "antd";

function PaymentData() {
  const [data, setData] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPaymentID, setSelectedPaymentID] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/transaction/payments")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const handleConfirm = (paymentID, email) => {
    setSelectedPaymentID(paymentID);
    setSelectedEmail(email);
    setConfirmModalVisible(true);
  };

  const handleSendEmail = async () => {
    setLoading(true);
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
      setLoading(false);
      setConfirmModalVisible(false);
    }
  };

  const handleDecline = (paymentID) => {
    setSelectedPaymentID(paymentID);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/transaction/payment/${selectedPaymentID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        notification.success({
          message: `Payment ID ${selectedPaymentID} deleted successfully!`,
        });
        setData(data.filter((item) => item.paymentID !== selectedPaymentID));
      } else {
        throw new Error("Failed to delete payment");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      notification.error({
        message: "Failed to delete payment",
      });
    } finally {
      setDeleteModalVisible(false);
    }
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
        {loading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            rowKey="paymentID"
            scroll={{ y: 500 }}
            pagination={false}
          />
        )}
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
            loading={loading}
            onClick={handleSendEmail}
          >
            Send
          </Button>,
        ]}
      >
        Are you sure you want to send confirmation email?
      </Modal>
      <Modal
        title="Delete Payment"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
      >
        Are you sure you want to delete this payment?
      </Modal>
    </div>
  );
}

export default PaymentData;
