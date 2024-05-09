import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./user";
import LearnerProfile from "./LearnerProfile";

function LearnerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LearnerProfile />} />
      <Route path="user" element={<User />} />
    </Routes>
  );
}

export default LearnerRoutes;
