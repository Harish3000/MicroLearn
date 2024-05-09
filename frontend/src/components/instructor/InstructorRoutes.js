import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./user";
import InstructorProfile from "./InstructorProfile";

function InstructorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InstructorProfile />} />
      <Route path="user" element={<User />} />
    </Routes>
  );
}

export default InstructorRoutes;
