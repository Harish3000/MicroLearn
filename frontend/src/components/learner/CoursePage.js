import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("CoursePage mounted");
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/admin/course/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    console.log("CourseId changed:", courseId);
    setLoading(true); // Reset loading state when courseId changes
  }, [courseId]);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h1 className="text-lg font-semibold">My Courses</h1>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <h1>Course : {course && course.courseName}</h1>
          <p>Description: {course && course.courseDetails}</p>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
