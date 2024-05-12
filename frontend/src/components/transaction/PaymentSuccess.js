import React, { useState, useEffect } from "react";
import { Modal, Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const customSpinner = (
  <LoadingOutlined style={{ fontSize: 64, color: "green" }} spin />
);

const PaymentProcessingModal = ({ visible }) => (
  <Modal
    visible={visible}
    footer={null}
    closable={false}
    centered
    maskClosable={false}
    bodyStyle={{ textAlign: "center" }}
  >
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {customSpinner}
      <p style={{ marginTop: 16, fontWeight: "bold" }}>
        Validating your payment...
      </p>
    </div>
  </Modal>
);

const PaymentSuccess = () => {
  const [processing, setProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartCourse = () => {
    navigate("/learner");
  };

  return (
    <>
      <PaymentProcessingModal visible={processing} />
      {!processing && (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <Result
              status="success"
              title="Payment Successful!"
              subTitle="Your Payment was successfully processed - Order number: 2017182818828182881. You can enroll into the course now."
              extra={[
                <Button
                  type="primary"
                  key="console"
                  onClick={handleStartCourse}
                >
                  Go to home page
                </Button>,
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
