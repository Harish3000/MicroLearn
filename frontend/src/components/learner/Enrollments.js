import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spin, Alert } from 'antd';
import 'antd/dist/reset.css';

function Enrollments() {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const response = await axios.get('http://localhost:9094/learner/get-all');
        setLearners(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLearners();
  }, []);

  const handleUpdate = (record) => {
    // Implement update functionality
  };

  const handleDelete = (record) => {
    // Implement delete functionality
  };

  const columns = [
    {
      title: 'Learner ID',
      dataIndex: 'learnerId',
      key: 'learnerId',
      width: 150, // Reduced column width
    },
    {
      title: 'Course ID',
      dataIndex: 'courseId',
      key: 'courseId',
      width: 150, // Reduced column width
    },
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
      width: 150, // Reduced column width
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250, // Reduced column width but slightly wider for buttons
      render: (text, record) => (
        <div className="flex space-x-2 p-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleUpdate(record)}>Update</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(record)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 flex justify-center items-center"> {/* Centered the entire table */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">Course Enrollement</h2> {/* Bold, centered, and larger font */}
        {loading ? (
          <Spin tip="Loading..." />
        ) : error ? (
          <Alert message={error} type="error" className="p-4" /> 
        ) : (
          <Table
            dataSource={learners}
            columns={columns}
            rowKey={(record) => record.enrollmentId}
            pagination={{ pageSize: 10 }}
            className="p-4" // Padding for the table
          />
        )}
      </div>
    </div>
  );
}

export default Enrollments;
