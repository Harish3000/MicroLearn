import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/admin/course/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false); // Make sure to set loading to false on error
      }
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h1 className="text-lg font-semibold">Course Details</h1>
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
          {/* Check if course data is available before trying to display it */}
          {course ? (
            <div className="flex flex-row" 
            style={{
              padding: "70px"
            }}>
              <div className="w-1/3 pr-4">
                <img
                  src={course.courseImage}
                  alt={course.courseName}
                  style={{
                    paddingLeft: "16px"
                  }}
                />
              </div>

              <div className="w-2/3"
              style={{
                paddingLeft:"20px"
              }}>
                <h2 className="text-4xl font-bold" style={{
                  textTransform: "uppercase",
                  color: "#003153"
                }}>{course.courseName}</h2>

                <h2 className="text-3xl font-semibold" style={{
                  paddingTop:"10px",
                  textTransform: "uppercase",
                  color: "#003153"
                }}
                >Course ID {course.courseId}</h2>

                <h3 style={{
                  paddingTop: "40px",
                  fontSize: "20px"
                }}>{course.courseDetails}</h3>

                <p style={{
                  fontSize: "25px",
                  color:"#242E2C",
                  fontWeight:"bold"
                }}>Enroll for this course just for ${course.price}</p>
              </div>

              <div className="fixed bottom-20 right-20">
        <button className="bg-green-500 text-white px-10 py-5 rounded text-[18px]">Enroll for this course</button>
      </div>
            </div>
          ) : (
            // display the error popup here
            <p>Course not found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
