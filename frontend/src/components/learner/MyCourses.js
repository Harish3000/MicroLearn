import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import EnrollmentTrendChart from "./EnrollmentTrendsChart";
import CourseDistributionChart from "./CourseDistributionChart";

export default function MyCourses() {
  const [userDetails, setUserDetails] = useState(null);
  const [courseList, setCourseList] = useState(null);
  const [courseIdObjects, setCourseIdObjects] = useState([]);
  const [courseDetailsArray, setCourseDetailsArray] = useState([]);
  const [learner, setLearner] = useState(null);
  const navigate = useNavigate();

  const enrollmentData = [
    { date: "2024-05-01", enrollments: 10 },
    { date: "2024-05-02", enrollments: 15 },
    { date: "2024-05-03", enrollments: 20 },
    { date: "2024-05-04", enrollments: 18 },
    { date: "2024-05-05", enrollments: 22 },
    { date: "2024-05-06", enrollments: 17 },
    { date: "2024-05-07", enrollments: 12 },
    { date: "2024-05-08", enrollments: 25 },
    { date: "2024-05-09", enrollments: 21 },
    { date: "2024-05-10", enrollments: 19 },
    { date: "2024-05-11", enrollments: 16 },
    { date: "2024-05-12", enrollments: 23 },
    { date: "2024-05-13", enrollments: 14 },
  ];
  
  const courseData = [
    { courseId: "SE001", enrollments: 30 },
    { courseId: "SE002", enrollments: 25 },
    { courseId: "SE003", enrollments: 15 },
    { courseId: "SE004", enrollments: 28 },
    { courseId: "SE005", enrollments: 32 },
    { courseId: "SE006", enrollments: 20 },
    { courseId: "SE007", enrollments: 18 },
    { courseId: "SE008", enrollments: 27 },
    { courseId: "SE009", enrollments: 23 },
    { courseId: "SE010", enrollments: 19 },
    { courseId: "SE011", enrollments: 21 },
    { courseId: "SE012", enrollments: 26 },
    { courseId: "SE013", enrollments: 16 },
  ];
  

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

  useEffect(() => {
    const fetchLearner = async () => {
      try {
        if (userDetails && userDetails.userId) {
          const response = await axios.get(
            `/learner/get-one-learner/${userDetails.userId}`
          );
          setLearner(response.data); // Update the learner state
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching learner details:", error);
      }
    };

    fetchLearner();
  }, [userDetails]);

  const goToCoursePage = (courseId) => {
    navigate(`/instructor/course/${courseId}`);
  };

  const unEnrollUser = async (courseId) => {
    if (!userDetails || !courseId || !learner) {
        console.error("User details, course ID, or learner data not available");
        return;
    }

    const updatedCourseIdList = learner.courseIdList.filter(id => id !== courseId);

    const updatedLearner = {
        ...learner,
        courseIdList: updatedCourseIdList,
    };

    try {
        const unenrollmentResponse = await axios.post(
            "/learner/create-learner",
            updatedLearner
        );

        if (unenrollmentResponse.status === 200) {
            notification.success({
                message: "Unenrollment Successful",
                description: "You have successfully unenrolled from the course!",
            });
            setCourseDetailsArray(prevCourses => prevCourses.filter(course => course.courseId !== courseId));
        } else {
            throw new Error(
                "Unenrollment failed with status: " + unenrollmentResponse.status
            );
        }
    } catch (error) {
        console.error("Error during unenrollment process:", error);
        notification.error({
            message: "Operation Failed",
            description: "An error occurred during the unenrollment process. Please try again later.",
        });
    }
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
          fontSize: "30px",
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
                height: "300px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "20px",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  height: "100%",
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
                    objectFit: "cover",
                    height: "80%",
                  }}
                />

                <div style={{ padding: "10px", textAlign: "center"}}>
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
                        className="bg-green-500"
                      >
                        Go to Course
                      </button>
                      <button
                        onClick={() => unEnrollUser(course.courseId)}
                        style={{
                          color: "#FFFFFF",
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
                        className="bg-red-500"
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
      <div>
        <h2 style={{
          textAlign: "center",
          fontSize: "25px",
          paddingTop: "60px",
          paddingBottom: "20px",
          fontWeight: "600"
        }}>Track your progress here!</h2>
        <div style={{
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}}>
      <EnrollmentTrendChart enrollmentData={enrollmentData} />
      </div>

      <div style={{
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}}>
      <CourseDistributionChart courseData={courseData} />
      </div>
      </div>
    </div>
  );
}
