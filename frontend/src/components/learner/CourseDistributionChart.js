import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const CourseDistributionChart = ({ courseData }) => {

  return (
    <div>
      <h3>Your Past Course Enrollment Distribution</h3>
      <BarChart width={950} height={350} data={courseData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="courseName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="enrollments" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default CourseDistributionChart;
