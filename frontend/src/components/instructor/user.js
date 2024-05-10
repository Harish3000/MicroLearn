import { Button, Form, Input, Modal, Table, message } from "antd";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const User = () => {
  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [userDetails, setUserDetails] = useState({});

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User data not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetch("/instructor/courses")
      .then((response) => response.json())
      .then((data) =>
        setData(data.map((course) => ({ ...course, approved: false })))
      );
  }, []);

  const columns = [
    {
      title: "CourseID",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "name",
    },
    {
      title: "Details",
      dataIndex: "courseDetails",
      key: "courseDetails",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Instructor ID",
      dataIndex: "instructorId",
      key: "instructorId",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>{" "}
          <Button type="danger" onClick={() => showDeleteModal(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleUpdate = (record) => {
    message.info("Contact admin for update.");
  };

  const showDeleteModal = (record) => {
    setSelectedCourse(record);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    fetch(`/instructor/course/${selectedCourse.courseId}`, {
      method: "DELETE",
      headers: {
        // Add any headers if required
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete course");
        }
        setDeleteModalVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleCancelDelete = () => {
    setSelectedCourse(null);
    setDeleteModalVisible(false);
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      // Set approved to false before sending to the backend
      const dataToSend = { ...values, approved: false };

      fetch("/instructor/course/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add course");
          }
          setAddModalVisible(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding course:", error);
        });
    });
  };

  const handleCancelAdd = () => {
    setAddModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-auto p-9 bg-white rounded shadow-xl relative">
        <Button type="primary" onClick={() => setAddModalVisible(true)}>
          +
        </Button>
        <br />
        <br />

        <Table columns={columns} dataSource={data} rowKey="courseId" />
      </div>
      <div className="horizontal-modals-container">
        <Modal
          title="Confirm Delete"
          visible={deleteModalVisible}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
          style={{ top: 20 }}
        >
          <p>
            Are you sure you want to delete{" "}
            {selectedCourse ? selectedCourse.courseName : ""}?
          </p>
        </Modal>
        <Modal
          title="Add Course"
          visible={addModalVisible}
          onOk={handleAdd}
          onCancel={handleCancelAdd}
          style={{ top: 20 }}
        >
          <div className="flex">
            <div className="w-1/2 pr-4">
              <Form form={form} layout="vertical">
                <Form.Item
                  name="courseId"
                  label="Course ID"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="courseName"
                  label="Course Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="courseDetails"
                  label="Details"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="instructorId"
                  label="Instructor ID"
                  initialValue={userDetails.userId}
                  rules={[{ required: true }]}
                >
                  <Input readOnly />
                </Form.Item>
              </Form>
            </div>
            <div className="w-1/2 pl-4">
              {/* <b>Contents</b> */}

              <Form form={form} layout="vertical">
                <Form.Item name="courseImage" label="Course Image URL">
                  <Input />
                </Form.Item>
                <Form.Item name={["content", "contentId"]} label="Content ID">
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["content", "contentTitle"]}
                  label="Content Title"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["content", "contentDescription"]}
                  label="Content Description"
                >
                  <Input />
                </Form.Item>
                <Form.Item name={["content", "contentUrl"]} label="Content URL">
                  <Input />
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default User;
