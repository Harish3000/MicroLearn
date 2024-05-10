import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./user";
import TransactionProfile from "./TransactionProfile";
import PaymentForm from "./PaymentForm";
import Card from "./Card";
import PaymentSuccess from "./PaymentSuccess";

function TransactionRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaymentForm />} />
      <Route path="/profile" element={<TransactionProfile />} />
      <Route path="/user" element={<User />} />
      <Route path="/card" element={<Card />} />
      <Route path="/success" element={<PaymentSuccess />} />
    </Routes>
  );
}

export default TransactionRoutes;
