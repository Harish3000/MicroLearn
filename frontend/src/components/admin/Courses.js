import React, { useEffect, useState } from "react";
import { Table, Button, notification, Spin } from "antd";

function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/courses")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Set loading to false after data is fetched
      });
  }, []);

  const approveCourse = (record) => {
    const { courseId, approved } = record;
    fetch(`/admin/course/toggleApproval/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          notification.success({
            message: approved ? "Course is Revoked!" : "Course is Approved!",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          notification.error({
            message: "Failed to approve/revoke course",
          });
        }
      })
      .catch((error) => {
        console.error("Error approving/revoking course:", error);
        notification.error({
          message: "Failed to approve/revoke course",
        });
      });
  };

  const columns = [
    { title: "ID", dataIndex: "courseId", key: "courseId" },
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    {
      title: "Course Details",
      dataIndex: "courseDetails",
      key: "courseDetails",
      ellipsis: true,
      width: "auto",
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Instructor ID", dataIndex: "instructorId", key: "instructorId" },
    {
      title: "Status",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => (
        <span
          className={`${
            approved ? "text-green-600" : "text-blue-600"
          } font-semibold`}
        >
          {approved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type={record.approved ? "danger" : "primary"}
          onClick={() => approveCourse(record)}
          className={
            record.approved ? "bg-red-500 hover:bg-red-600 text-white" : ""
          }
        >
          {record.approved ? "Revoke" : "Approve"}
        </Button>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-3/4 p-10 bg-white rounded shadow-xl">
        {loading ? ( // Render spinner if loading
          <div className="flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            rowKey="courseId"
            scroll={{ y: 500 }}
            pagination={false}
          />
        )}
      </div>
    </div>
  );
}

export default Courses;
