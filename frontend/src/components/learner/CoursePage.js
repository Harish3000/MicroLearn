import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { notification } from "antd";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate(); // Import useNavigate hook
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [learner, setLearner] = useState(null);

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

  useEffect(() => {
    const fetchLearner = async () => {
      try {
        if (userDetails && userDetails.userId) {
          const response = await axios.get(
            `/learner/get-one-learner/${userDetails.userId}`
          );
          setLearner(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching learner details:", error);
      }
    };

    fetchLearner();
  }, [userDetails]);

  const handleEnrollment = async () => {
    if (!userDetails || !learner) {
      console.error("User details or learner details not available");
      return;
    }

    try {
      // Fetch payment data from the endpoint
      const paymentResponse = await axios.get("/transaction/payments");
      const payments = paymentResponse.data;

      // Extract paymentIDs
      const paymentIDs = payments.map((payment) => payment.paymentID);

      // Sort paymentIDs
      paymentIDs.sort();

      // Get the last paymentID
      const lastPaymentID = paymentIDs[paymentIDs.length - 1];

      // Extract the numeric part of the last paymentID
      const lastPaymentIDNumeric = parseInt(lastPaymentID.slice(3));

      // Increment the numeric part to create a new paymentID
      const newPaymentID = `PAY${String(lastPaymentIDNumeric + 1).padStart(
        3,
        "0"
      )}`;

      // Continue with enrollment process using the newPaymentID
      const learnerId = userDetails.userId;
      const courseId = course.courseId;

      const newEnrollment = {
        learnerId,
        courseId,
        paymentId: newPaymentID, // Use the newPaymentID
      };

      const updatedCourseIdLearner = [...learner.courseIdList];

      if (!updatedCourseIdLearner.includes(courseId)) {
        updatedCourseIdLearner.push(courseId);

        const newLearner = {
          ...learner,
          courseIdList: updatedCourseIdLearner,
        };

        const enrollmentResponse = await axios.post(
          "/learner/enroll",
          newEnrollment
        );

        if (enrollmentResponse.status === 200) {
          notification.success({
            message: "Trial Enrollment successful",
            description: "You have successfully activated trial course!",
          });

          // Add a delay of 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 3000));

          const learnerResponse = await axios.post(
            "/learner/create-learner",
            newLearner
          );

          if (learnerResponse.status === 200) {
            notification.success({
              message: "Loading payment details...",
              description: "Please wait...",
            });

            // Navigate to /transaction after 3 seconds
            setTimeout(() => {
              navigate("/transaction", {
                state: {
                  paymentId: newPaymentID, // Pass paymentId
                  courseId: courseId, // Pass courseId
                  learnerId: learnerId, // Pass learnerId
                  amount: course.price, // Pass course price
                },
              });
            }, 2000);
          } else {
            throw new Error(
              "Learner creation failed with status: " + learnerResponse.status
            );
          }
        } else {
          throw new Error(
            "Enrollment failed with status: " + enrollmentResponse.status
          );
        }
      } else {
        notification.warning({
          message: "Already Enrolled",
          description: "You are already enrolled in this course!",
        });
      }
    } catch (error) {
      console.error("Error during the process:", error);
      notification.error({
        message: "Operation Failed",
        description:
          "An error occurred during the process. Please try again later.",
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
