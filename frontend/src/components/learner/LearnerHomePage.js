import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import { Button } from "antd";

const LearnerHomePage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/admin/courses");
        const approvedCourses = response.data.filter(
          (course) => course.approved
        );
        setCourses(approvedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
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
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Available Courses</h1>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
            onClick={() => navigate("/learner/profile")}
          >
            👤Account
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link to={`/learner/course/${course.courseId}`} key={course.courseId}>
            <div className="bg-white shadow-md rounded-lg p-4 transition duration-300 ease-in-out transform hover:shadow-xl cursor-pointer">
              <div className="w-full h-64 mb-2 rounded-t-lg overflow-hidden">
                <img
                  src={course.courseImage}
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-20 rounded-b-lg">
                <p className="text-center">{course.courseName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/learner/my-courses")}
        >
          View My Courses
        </button>
      </div>
    </div>
  );
};

export default LearnerHomePage;
