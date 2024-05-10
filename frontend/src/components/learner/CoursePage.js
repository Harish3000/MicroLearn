import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import { notification } from "antd";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [instructor, setInstructor] = useState(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.warn("User data not found.");
          }
        } else {
          console.warn("User is not logged in.");
        }
      });
    };

    fetchUserData();
  }, []);

  const handleEnrollment = async () => {
    const learnerId = userDetails.userId; // Replace with the actual learner ID
    const courseId = course.courseId; // Should be obtained from `course.courseId`
    const paymentId = "PAY001"; //Hard coded
  
    const newEnrollment = {
      learnerId,
      courseId,
      paymentId,
    };

    console.log(newEnrollment);
  
    try {
      const response = await axios.post("http://localhost:9094/learner/create", newEnrollment);
      if (response.status === 200) {
        notification.success({
          message: "Enrollment Successful",
          description: "You have successfully enrolled in the course!",
        });
      } else {
        notification.error({
          message: "Enrollment Failed",
          description: "An error occurred during enrollment.",
        });
      }
    } catch (error) {
      console.error("Error creating enrollment:", error);
      notification.error({
        message: "Enrollment Failed",
        description: "An error occurred during enrollment.",
      });
    }
  };

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
            <div
              className="flex flex-row"
              style={{
                padding: "70px",
              }}
            >
              <div className="w-1/3 pr-4">
                <img
                  src={course.courseImage}
                  alt={course.courseName}
                  style={{
                    paddingLeft: "16px",
                    paddingTop: "80px",
                    boxShadow: "#003153",
                  }}
                  className="shadow-lg"
                />
              </div>

              <div
                className="w-2/3"
                style={{
                  paddingLeft: "35px",
                }}
              >
                <h2
                  className="text-4xl font-bold"
                  style={{
                    textTransform: "uppercase",
                    color: "#003153",
                  }}
                >
                  {course.courseName}
                </h2>

                <h2
                  className="text-3xl font-semibold"
                  style={{
                    paddingTop: "10px",
                    textTransform: "uppercase",
                    color: "#003153",
                  }}
                >
                  Course ID {course.courseId}
                </h2>

                <ul style={{
                  fontSize: "20px"
                }}>
                  {course.courseDetails.split(".").map(
                    (detail, index) =>
                      detail.trim() && ( // Only create bullet points for non-empty sentences
                        <li style={{
                          paddingTop:"20px"
                        }}key={index}>• &nbsp;{detail.trim()}.</li>
                      )
                  )}
                </ul>

                <p
                  style={{
                    fontSize: "25px",
                    color: "#242E2C",
                    fontWeight: "bold",
                    paddingTop: "20px",
                  }}
                >
                  Enroll for this course just for ${course.price}
                </p>
              </div>

              <div className="fixed bottom-20 right-20">
                <button className="bg-green-500 text-white px-10 py-5 rounded text-[18px]"
                onClick={handleEnrollment}>
                  Enroll for this course
                </button>
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
