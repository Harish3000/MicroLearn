import {
  BarChartOutlined,
  BookOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, Typography } from "antd";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

const { Header, Footer, Content, Sider } = Layout;
const { Title } = Typography;

function InstructorProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [guideModalVisible, setGuideModalVisible] = useState(false);
  const navigate = useNavigate();

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

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="2" icon={<UploadOutlined />}>
            Upload
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            Charts
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            textAlign: "center",
            backgroundColor: "#001529",
            color: "white",
            fontSize: "1.5rem",
          }}
        >
          <b>Welcome to instructor profile</b>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, background: "#fff" }}
          >
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Year", "Sales"],
                [2018, 15],
                [2019, 6],
                [2020, 10],
                [2021, 8],
                [2022, 20],
                [2024, 21],
              ]}
              options={{
                title: "Course Sales Over Time",
                curveType: "function",
                hAxis: {
                  title: "Year",
                  ticks: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
                },
                vAxis: {
                  title: "Sales",
                  gridlines: { color: "transparent" },
                },
                colors: ["#875F9A"],
              }}
              rootProps={{ "data-testid": "1" }}
            />

            <br></br>
            {userDetails ? (
              <>
                <div className="flex flex-col items-center mb-6">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <Title level={2} className="mb-4">
                    Welcome, Instructor {userDetails.firstName}!
                  </Title>
                  <div className="bg-gray-100 rounded p-4 mb-6">
                    <p className="text-gray-600">
                      First Name: {userDetails.firstName}
                    </p>
                    <p className="text-gray-600">
                      Last Name: {userDetails.lastName}
                    </p>
                    <p className="text-gray-600">Email: {userDetails.email}</p>
                    <p className="text-gray-600">Role: {userDetails.role}</p>
                    <p className="text-gray-600">
                      User ID: {userDetails.userId}
                    </p>
                  </div>
                  <div className="flex justify-between w-half">
                    <Button
                      type="primary"
                      size="large"
                      className="w-1/2 font-bold mr-2"
                      onClick={() => navigate("/instructor/user")}
                    >
                      Panel
                    </Button>
                    <Button
                      type="primary"
                      danger
                      size="large"
                      className="w-1/2 font-bold ml-2"
                      onClick={handleLogout}
                      icon={<LogoutOutlined />}
                    >
                      Logout
                    </Button>
                  </div>
                  <div className="mt-8">
                    <Button
                      type="dashed"
                      size="large"
                      onClick={() => setGuideModalVisible(true)}
                      icon={<BookOutlined />}
                    >
                      View Guides
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#001529",
            color: "white",
          }}
        >
          Microlearn 2024
        </Footer>
        <Modal
          title="Guide for Instructors"
          visible={guideModalVisible}
          onOk={() => setGuideModalVisible(false)}
          onCancel={() => setGuideModalVisible(false)}
          width={800}
        >
          <ol>
            <li>
              <Title level={3}>Understanding Your Role:</Title>
              <ul>
                <li>
                  As an instructor, your responsibility is to educate and guide
                  students in their learning.
                </li>
                <li>
                  Your role involves creating engaging and informative course
                  materials, delivering lectures, and providing feedback to
                  students.
                </li>
              </ul>
            </li>
            <li>
              <Title level={3}>Creating Effective Course Materials:</Title>
              <ul>
                <li>
                  Design your course materials with clear learning objectives in
                  mind.
                </li>
                <li>
                  Use a variety of resources such as slides videos and
                  interactive quizzes to cater to different learning styles.
                </li>
                <li>
                  Ensure that your content is well-structured and easy to
                  navigate.
                </li>
              </ul>
            </li>
            <li>
              <Title level={3}>Engaging Students:</Title>
              <ul>
                <li>
                  Encourage active participation through discussions, group
                  activities, and hands-on projects.
                </li>
                <li>
                  Foster a supportive learning environment where students feel
                  comfortable asking questions and sharing their ideas.
                </li>
                <li>
                  Provide timely feedback on assignments and assessments to help
                  students track their progress.
                </li>
              </ul>
            </li>
          </ol>
        </Modal>
      </Layout>
    </Layout>
  );
}

export default InstructorProfile;
