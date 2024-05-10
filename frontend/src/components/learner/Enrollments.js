import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Modal, Form, Input, message } from 'antd';
import 'antd/dist/reset.css';

function Enrollments() {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [learnerToDelete, setLearnerToDelete] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [learnerToUpdate, setLearnerToUpdate] = useState(null);
  const [form] = Form.useForm(); // Form instance

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const response = await axios.get('/learner/get-all');
        setLearners(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLearners();
  }, []);

  const showDeleteModal = (record) => {
    setLearnerToDelete(record);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (learnerToDelete) {
      try {
        const response = await axios.delete(`/learner/delete/${learnerToDelete.enrollmentId}`);
        if (response.status === 200) {
          setLearners(learners.filter((learner) => learner.enrollmentId !== learnerToDelete.enrollmentId));
          message.success('Unenrolled successfully.');
        } else {
          message.error('Failed to unenroll learner.');
        }
      } catch (err) {
        message.error('Error unenrolling learner: ' + err.message);
      } finally {
        setDeleteModalVisible(false);
        setLearnerToDelete(null);
      }
    }
  };

  const showUpdateModal = (record) => {
    setLearnerToUpdate(record);
    form.setFieldsValue({
      learnerId: record.learnerId,
      courseId: record.courseId,
      paymentId: record.paymentId,
    });
    setUpdateModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const response = await axios.put(`/learner/update/${learnerToUpdate.enrollmentId}`, values);
      if (response.status === 200) {
        setLearners((prev) =>
          prev.map((learner) =>
            learner.enrollmentId === learnerToUpdate.enrollmentId ? response.data : learner
          )
        );
        message.success('Enrollment updated successfully.');
      } else {
        message.error('Failed to update enrollment.');
      }
    } catch (err) {
      message.error('Error updating enrollment: ' + err.message);
    } finally {
      setUpdateModalVisible(false);
      setLearnerToUpdate(null);
    }
  };

  const columns = [
    {
      title: 'Learner ID',
      dataIndex: 'learnerId',
      key: 'learnerId',
      width: 200,
    },
    {
      title: 'Course ID',
      dataIndex: 'courseId',
      key: 'courseId',
      width: 200,
    },
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
      width: 200,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250,
      render: (text, record) => (
        <div className="flex space-x-2 p-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded" style={{ marginLeft: '60px', marginRight: "80px" }}>
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => showDeleteModal(record)}
          >
            Unenroll
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="shadow-lg bg-gray-200 p-6 rounded-lg">
      <div className="p-6 flex justify-center items-center">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">Course Enrollment</h2>
          {loading ? (
            <Spin tip="Loading..." />
          ) : error ? (
            <Alert message={error} type="error" />
          ) : (
            <Table
              dataSource={learners}
              columns={columns}
              rowKey={(record) => record.enrollmentId}
              className="text-lg"
              scroll={{ y: 500 }}
              pagination={false}
            />
          )}
        </div>
      </div>

{/* Delete Modal */}
      <Modal
        title="Confirmation"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Unenroll"
        cancelText="Cancel"
      >
        <p>Are you sure you want to unenroll this learner?</p>
      </Modal>

      {/* Update Modal */}
      <Modal
        title="Update Enrollment"
        visible={updateModalVisible}
        onOk={handleUpdate}
        onCancel={() => setUpdateModalVisible(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Learner ID"
            name="learnerId"
            rules={[{ required: true, message: 'Please enter Learner ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Course ID"
            name="courseId"
            rules={[{ required: true, message: 'Please enter Course ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Payment ID"
            name="paymentId"
            rules={[{ required: true, message: 'Please enter Payment ID' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Enrollments;
