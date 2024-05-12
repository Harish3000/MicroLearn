import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const EnrollmentTrendChart = ({ enrollmentData }) => {
  return (
    <div>
      <h3>Your Course Enrollment Trends Over Time</h3>
      <LineChart width={950} height={350} data={enrollmentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="enrollments" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default EnrollmentTrendChart;
