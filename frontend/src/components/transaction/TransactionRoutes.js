import React from "react";
import { Route, Routes } from "react-router-dom";
import TransactionProfile from "./TransactionProfile";
import PaymentForm from "./PaymentForm";
import Card from "./Card";
import PaymentSuccess from "./PaymentSuccess";
import PaymentData from "./PaymentData";

function TransactionRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaymentForm />} />
      <Route path="/profile" element={<TransactionProfile />} />
      <Route path="/card" element={<Card />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/paymentdata" element={<PaymentData />} />
    </Routes>
  );
}

export default TransactionRoutes;
