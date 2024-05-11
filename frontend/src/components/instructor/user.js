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
  const [popupVisible, setPopupVisible] = useState(false);
  const [adVisible, setAdVisible] = useState(true);
  const courseDetailsMaxLength = 100;

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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Details",
      dataIndex: "courseDetails",
      key: "courseDetails",
      render: (text) => (
        <span>
          {text.length > courseDetailsMaxLength
            ? text.substring(0, courseDetailsMaxLength) + "..."
            : text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>{" "}
          <br />
          <br />
          <Button type="primary" danger onClick={() => showDeleteModal(record)}>
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

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const toggleAd = () => {
    setAdVisible(!adVisible);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {/* Popup */}
      <Modal
        title="Important Message"
        visible={popupVisible}
        onCancel={togglePopup}
        footer={[
          <Button key="back" onClick={togglePopup}>
            Close
          </Button>,
        ]}
      >
        <p>This is an important message for the user.</p>
      </Modal>

      {adVisible && (
        <div className="ad-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_4Nj-MocjJl4deSsBtk6sVznLQ9CU945cAHZMI02jRg&s"
            alt="Advertisement"
          />
          <Button onClick={toggleAd} className="close-ad-btn">
            Close Ad
          </Button>
        </div>
      )}

      {/* Other content */}
      <div className="w-full h-full p-12 bg-white rounded shadow-xl relative">
        <Button
          type="primary"
          onClick={() => setAddModalVisible(true)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: "1",
          }}
        >
          + ADD
        </Button>
        <br />
        <br />

        <Table
          columns={columns}
          dataSource={data}
          rowKey="courseId"
          scroll={{ y: "calc(100vh - 240px)" }}
        />
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
