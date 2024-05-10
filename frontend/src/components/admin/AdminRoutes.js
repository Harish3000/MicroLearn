import React from "react";
import { Route, Routes } from "react-router-dom";
import Courses from "./Courses";
import AdminProfile from "./AdminProfile";
import AdminHome from "./AdminHome";
import Enrollments from "../learner/Enrollments";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/enrollment" element={<Enrollments />} />
    </Routes>
  );
}

export default AdminRoutes;
