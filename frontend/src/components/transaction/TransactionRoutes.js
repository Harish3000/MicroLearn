import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./user";
import TransactionProfile from "./TransactionProfile";

function TransactionRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TransactionProfile />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default TransactionRoutes;
