import React, { useEffect, useState } from "react";
import { Table, notification, Modal, Button, Form, Input, Select } from "antd";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function Users() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [roleOptions, setRoleOptions] = useState(["Instructor", "Learner"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const handleUpdate = async (record) => {
    setVisible(true);
    setFormData(record);
  };

  const handleDelete = async (userId) => {
    setDeleteUserId(userId);
    setDeleteConfirmVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "Users");
      const userQuery = query(usersRef, where("userId", "==", deleteUserId));
      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setData(data.filter((item) => item.userId !== deleteUserId));
      setDeleteConfirmVisible(false);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      notification.error({
        message: "Failed to delete user",
      });
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmVisible(false);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      await updateUserData(formData);
      setVisible(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      notification.error({
        message: "Failed to update user data",
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const updateUserData = async (formData) => {
    const usersRef = collection(db, "Users");
    const userQuery = query(usersRef, where("userId", "==", formData.userId));
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      });
    });
    setData(
      data.map((item) => (item.userId === formData.userId ? formData : item))
    );
  };

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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>{" "}
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.userId)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-4/5 p-10 bg-white rounded shadow-xl">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="userId"
          scroll={{ y: 500 }}
          pagination={false}
        />
        <Modal
          title="Update User"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="update"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Update
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="User ID">
              <Input value={formData.userId} readOnly />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="First Name">
              <Input
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Role">
              <Select
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
              >
                {roleOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Confirm Delete"
          visible={deleteConfirmVisible}
          onOk={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          okText="Delete"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      </div>
    </div>
  );
}

export default Users;
