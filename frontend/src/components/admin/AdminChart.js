import React from "react";
import { Chart } from "react-google-charts";

const AdminChart = () => {
  // Generate some sample data for demonstration
  const data = [
    ["Date", "Number of Users"],
    ["2024-05-06", 2],
    ["2024-05-07", 5],
    ["2024-05-08", 6],
    ["2024-05-09", 3],
    ["2024-05-10", 2],
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
