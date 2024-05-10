import React from "react";
import { Chart } from "react-google-charts";

const AdminChart = () => {
  // Generate some sample data for demonstration
  const data = [
    ["Date", "Number of Users"],
    ["2024-05-09", 100],
    ["2024-05-10", 120],
    ["2024-05-11", 150],
    ["2024-05-12", 130],
    ["2024-05-13", 140],
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">User Activity Chart</h2>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          hAxis: {
            title: "Date",
          },
          vAxis: {
            title: "Number of Users",
          },
          chartArea: { width: "80%", height: "70%" },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default AdminChart;
