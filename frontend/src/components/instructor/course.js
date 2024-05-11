import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Layout,
  Menu,
  Modal,
  Rate,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const { Content, Header, Footer, Sider } = Layout;
const { Meta } = Card;

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentModalVisible, setEnrollmentModalVisible] = useState(false);

  useEffect(() => {
    fetch(`/instructor/course/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched course data:", data); // Add this line for logging
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [courseId]);

  const handleEnrollButtonClick = () => {
    // Open enrollment modal
    setEnrollmentModalVisible(true);
  };

  const handleEnrollmentModalOk = () => {
    // Perform enrollment action (Fake action)
    console.log("Enrollment action performed.");
    // Close enrollment modal
    setEnrollmentModalVisible(false);
  };

  const handleEnrollmentModalCancel = () => {
    // Close enrollment modal
    setEnrollmentModalVisible(false);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Skeleton active />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <Layout className="layout">
      <Header className="bg-gray-900 text-white">
        <div className="flex justify-between items-center">
          <div className="logo text-xl font-bold">Microlearn</div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">instructor</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
              <Link to="/courses">Courses</Link>
            </Menu.Item>
            {/* Add more menu items as needed */}
          </Menu>
        </div>
      </Header>
      <Content className="bg-gray-100" style={{ padding: "0 20px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider width={200} style={{ background: "#fff" }}>
            {/* Left Sidebar Content */}
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/courses">Courses</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{course.courseName}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="max-w-7xl mx-auto py-6 px-4 flex justify-center">
              <Card
                hoverable
                cover={<img alt="course" src={course.courseImage} />}
                style={{ width: 800 }} // Adjust the width of the card as needed
              >
                <Meta
                  title={<b>{course.courseName}</b>}
                  description={course.courseDetails}
                />
                <div className="mt-4">
                  <p className="text-lg font-bold">Price: ${course.price}</p>
                  <p className="text-lg">Instructor: {course.instructorId}</p>
                  <div className="flex items-center mb-4">
                    <Rate allowHalf defaultValue={4.2} />
                    <span className="ml-2">
                      {course.rating} ({5} ratings)
                    </span>
                  </div>
                  <Button
                    type="primary"
                    className="mt-4"
                    onClick={handleEnrollButtonClick}
                  >
                    Enroll Now
                  </Button>
                  {course.content && (
                    <div className="mt-4">
                      <p className="text-lg font-semibold">
                        Additional Content:
                      </p>
                      <p>{course.content.contentDescription}</p>
                      <a
                        href={course.content.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blues-500"
                      >
                        Download Content
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </Content>
          <Sider width={200} style={{ background: "#fff" }}></Sider>
        </Layout>
      </Content>
      <Footer className="text-center bg-gray-900 text-white">
        Course Platform ©2024 Created by Microlearn
      </Footer>
      <Modal
        title="Enroll Confirmation"
        visible={enrollmentModalVisible}
        onOk={handleEnrollmentModalOk}
        onCancel={handleEnrollmentModalCancel}
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
        }}
        cancelButtonProps={{ style: { borderColor: "#1890ff" } }}
        bodyStyle={{ backgroundColor: "#f0f5ff" }}
      >
        <div>
          <img
            src={course.courseImage}
            alt="course"
            style={{ width: "100%", marginBottom: 16 }}
          />
          <p style={{ color: "#1890ff" }}>
            Did you want to enroll in the course {course.courseName}?
          </p>
        </div>
      </Modal>
    </Layout>
  );
};

export default Course;
