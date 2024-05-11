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
  const [courseIdLearner, setCourseIdLearner] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/admin/course/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
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
    if (!userDetails) {
      console.error("User details not available");
      return;
    }

    const learnerId = userDetails.userId;
    const learnerName = userDetails.firstName;
    const email = userDetails.email;
    const courseId = course.courseId;
    const paymentId = "PAY001"; // Hardcoded

    const newEnrollment = {
      learnerId,
      courseId,
      paymentId,
    };
    if (!courseIdLearner.includes(courseId)) {
      const updatedCourseIdLearner = [...courseIdLearner, courseId];
      setCourseIdLearner(updatedCourseIdLearner);

      const newLearner = {
        learnerId,
        learnerName,
        email,
        courseIdList: updatedCourseIdLearner,
      };

      console.log(newLearner);

      try {
        const enrollmentResponse = await axios.post(
          "/learner/enroll",
          newEnrollment
        );

        if (enrollmentResponse.status === 200) {
          notification.success({
            message: "Enrollment Successful",
            description: "You have successfully enrolled in the course!",
          });
        } else {
          throw new Error(
            "Enrollment failed with status: " + enrollmentResponse.status
          );
        }

        const learnerResponse = await axios.post(
          "/learner/create-learner",
          newLearner
        );

        if (learnerResponse.status === 200) {
          notification.success({
            message: "Learner Created",
            description: "Learner profile has been created successfully!",
          });
        } else {
          throw new Error(
            "Learner creation failed with status: " + learnerResponse.status
          );
        }
      } catch (error) {
        console.error("Error during the process:", error);

        notification.error({
          message: "Operation Failed",
          description:
            "An error occurred during the process. Please try again later.",
        });
      }
    } else {
      // Notify user that the course is already enrolled
      notification.warning({
        message: "Already Enrolled",
        description: "You are already enrolled in this course!",
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

                <ul
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {course.courseDetails.split(".").map(
                    (detail, index) =>
                      detail.trim() && (
                        <li
                          style={{
                            paddingTop: "20px",
                          }}
                          key={index}
                        >
                          • &nbsp;{detail.trim()}.
                        </li>
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
                <button
                  className="bg-green-500 text-white px-10 py-5 rounded text-[18px]"
                  onClick={handleEnrollment}
                >
                  Enroll for this course
                </button>
              </div>
            </div>
          ) : (
            <p>Course not found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
