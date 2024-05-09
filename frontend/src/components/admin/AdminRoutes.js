import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./user";
import AdminProfile from "./AdminProfile";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminProfile />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default AdminRoutes;
