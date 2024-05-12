import React from "react";
import { Route, Routes } from "react-router-dom";
import InstructorProfile from "./InstructorProfile";
import Course from "./course";
import User from "./user";

function InstructorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InstructorProfile />} />
      <Route path="user" element={<User />} />
      <Route path="course/:courseId" element={<Course />} />
    </Routes>
  );
}

export default InstructorRoutes;
