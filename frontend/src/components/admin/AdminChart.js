import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Spin } from "antd";

const AdminChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "Users");
        const querySnapshot = await getDocs(query(usersRef, orderBy("date")));
        const cumulativeData = calculateChartData(querySnapshot);
        setChartData(cumulativeData);
        setLoading(false); // Set loading to false after data is loaded
      } catch (error) {
        console.error("Error fetching user activity data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateChartData = (querySnapshot) => {
    const userData = new Map();
    const currentDate = new Date();
    const pastFourDays = new Date(currentDate);
    pastFourDays.setDate(currentDate.getDate() - 4);

    // Iterate over the past 4 days and fill data points
    for (
      let date = new Date(pastFourDays);
      date <= currentDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split("T")[0];
      userData.set(dateString, 0);
    }

    // Update cumulative users count
    querySnapshot.forEach((doc) => {
      const userDataPoint = doc.data();
      const date = userDataPoint.date;
      if (userData.has(date)) {
        const count = userData.get(date);
        userData.set(date, count + 1);
      }
    });

    // Convert map to array
    const chartData = [["Date", "Number of Users"]];
    userData.forEach((count, date) => {
      chartData.push([date, count]);
    });

    return chartData;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">User Activity </h2>
      {loading ? ( // Display spinner when loading is true
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            hAxis: {
              title: "Date",
              format: "yyyy-MM-dd",
            },
            vAxis: {
              title: "Number of Users",
              minValue: 0,
              gridlines: { count: 5 },
              format: "0",
            },
            chartArea: { width: "80%", height: "70%" },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </div>
  );
};

export default AdminChart;
