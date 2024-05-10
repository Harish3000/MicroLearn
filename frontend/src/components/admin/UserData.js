import React, { useEffect, useState } from "react";
import { Table, notification } from "antd";
import { db } from "../firebase"; // Importing Firebase db instance
import { collection, getDocs, orderBy, query } from "firebase/firestore"; // Importing necessary Firebase functions

function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the Users collection in Firebase and sorting by user ID
        const usersRef = query(collection(db, "Users"), orderBy("userId"));
        const snapshot = await getDocs(usersRef);
        const usersData = snapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data(),
        }));
        setData(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
        notification.error({
          message: "Failed to fetch users",
        });
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId.localeCompare(b.userId),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-3/4 p-10 bg-white rounded shadow-xl">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="userId"
          scroll={{ y: 500 }}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default Users;
