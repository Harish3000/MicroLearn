import { AppstoreOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Layout, Menu, Modal, Skeleton } from "antd";
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
        console.log("Fetched course data:", data);
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [courseId]);

  const handleEnrollButtonClick = () => {
    setEnrollmentModalVisible(true);
  };

  const handleEnrollmentModalOk = () => {
    console.log("Enrollment action performed.");
    setEnrollmentModalVisible(false);
  };

  const handleEnrollmentModalCancel = () => {
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

  const getVideoIdFromUrl = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match && match[1];
  };

  const videoId = getVideoIdFromUrl(course.content.contentUrl);
  return (
    <Layout className="layout">
      <Header className="bg-gray-900 text-white">
        <div className="flex justify-between items-center">
          <div className="logo text-xl font-bold">Microlearn</div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            {/* <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">instructor</Link>
            </Menu.Item> */}
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
              <Link to="/courses">Courses</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content className="bg-gray-100" style={{ padding: "0 20px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider width={200} style={{ background: "#fff" }}></Sider>
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
                style={{ width: 800 }}
              >
                <Meta
                  title={<b>{course.courseName}</b>}
                  description={course.courseDetails}
                />
                <div className="mt-4">
                  <p className="text-lg font-bold">
                    You need to do self study for this course 🤨
                  </p>
                  <p className="text-lg">Instructor: {course.instructorId}</p>

                  <Button
                    type="primary"
                    className="mt-4"
                    onClick={handleEnrollButtonClick}
                  >
                    more info
                  </Button>
                  {course.content && (
                    <div className="mt-4">
                      <p className="text-lg font-semibold">
                        Additional Content:
                      </p>
                      <p>{course.content.contentDescription}</p>
                      <div className="mt-4">
                        <iframe
                          title="Course Video"
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
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
        title="Course Details"
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
          <p style={{ color: "#1890ff" }}>{course.courseName}?</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default Course;
