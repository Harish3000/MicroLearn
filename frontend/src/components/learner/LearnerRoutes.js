import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./user";
import LearnerProfile from "./LearnerProfile";
import LearnerHomePage from "./LearnerHomePage";
import CoursePage from "./CoursePage";

function LearnerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LearnerHomePage />} />
      <Route path="/profile" element={<LearnerProfile />} />
      <Route path="course/:courseId" element={<CoursePage />} />
      <Route path="user" element={<User />} />
    </Routes>
  );
}

export default LearnerRoutes;
