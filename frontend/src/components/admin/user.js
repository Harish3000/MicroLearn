import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";

function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/admin/courses")
      .then((response) => response.json())
      .then((data) => setData(data.courses));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "Course Details",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Instructor ID",
      dataIndex: "instructorId",
      key: "instructorId",
    },
    {
      title: "Update",
      key: "update",
      render: () => <Button type="primary">Update</Button>,
    },
    {
      title: "Delete",
      key: "delete",
      render: () => <Button type="danger">Delete</Button>,
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-auto p-10 bg-white rounded shadow-xl">
        <Table columns={columns} dataSource={data} rowKey="courseId" />
      </div>
    </div>
  );
}

export default User;
