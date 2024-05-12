import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [userDetails, setUserDetails] = useState(null);
  const [courseList, setCourseList] = useState(null);
  const [courseIdObjects, setCourseIdObjects] = useState([]);
  const [courseDetailsArray, setCourseDetailsArray] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCourseList = async () => {
      // Check if userDetails and userDetails.userId exist before making the API call
      if (userDetails?.userId) {
        try {
          const response = await axios.get(
            `/learner/get-one-learner/${userDetails.userId}`
          );
          setCourseList(response.data);
        } catch (error) {
          console.error("Error fetching course list");
        }
      }
    };
    fetchCourseList();
  }, [userDetails]);

  useEffect(() => {
    // Extract courseIdList from courseList and store each course ID as an object
    if (courseList && courseList.courseIdList) {
      const courseIdObjects = courseList.courseIdList.map((courseId) => ({
        id: courseId,
      }));
      setCourseIdObjects(courseIdObjects);
    }
  }, [courseList]);

  useEffect(() => {
    // Fetch course details for each courseIdObject
    const fetchCourseDetails = async () => {
      if (courseIdObjects.length > 0) {
        const courseDetails = [];
        for (const courseIdObject of courseIdObjects) {
          try {
            const response = await axios.get(
              `/admin/course/${courseIdObject.id}`
            );
            courseDetails.push(response.data);
          } catch (error) {
            console.error(
              `Error fetching course details for courseId ${courseIdObject.id}:`,
              error
            );
          }
        }
        // Set the fetched course details in courseDetailsArray state
        setCourseDetailsArray(courseDetails);
      }
    };
    fetchCourseDetails();
  }, [courseIdObjects]);

  const goToCoursePage = (courseId) => {
    navigate(`/instructor/course/${courseId}`);
  };

  const unEnrollUser = () => {
    console.log("Unenrolled");
  };

  const handleMouseEnter = (index) => {
    const updatedCourseDetailsArray = [...courseDetailsArray];
    updatedCourseDetailsArray[index].hovered = true;
    setCourseDetailsArray(updatedCourseDetailsArray);
  };

  const handleMouseLeave = (index) => {
    const updatedCourseDetailsArray = [...courseDetailsArray];
    updatedCourseDetailsArray[index].hovered = false;
    setCourseDetailsArray(updatedCourseDetailsArray);
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontSize: "35px",
          fontWeight: "bold",
          padding: "30px",
        }}
      >
        My Courses
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {courseDetailsArray.map((course, index) => (
          <div
            key={index}
            style={{ width: "30%", margin: "10px", position: "relative" }}
          >
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "20px",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <img
                  src={course.courseImage}
                  alt={course.courseName}
                  style={{
                    width: "100%",
                    opacity: course.hovered ? 0.7 : 1,
                    transition: "opacity 0.7s",
                    borderRadius: "10px",
                  }}
                />

                <div style={{ padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {course.courseName}
                  </div>
                  {course.hovered && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() => goToCoursePage(course.courseId)}
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "#000000",
                          border: "2px solid #1A1A1A",
                          borderRadius: "15px",
                          boxSizing: "border-box",
                          cursor: "pointer",
                          display: "inline-block",
                          fontSize: "20px",
                          fontWeight: "600",
                          textAlign: "center",
                          padding: "12px 20px",
                          marginBottom: "20px",
                        }}
                      >
                        Go to Course
                      </button>
                      <button
                        onClick={() => unEnrollUser()}
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "Red",
                          border: "2px solid #red",
                          borderRadius: "15px",
                          boxSizing: "border-box",
                          cursor: "pointer",
                          display: "inline-block",
                          fontSize: "20px",
                          fontWeight: "600",
                          textAlign: "center",
                          padding: "12px 20px",
                        }}
                      >
                        Unenroll
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
