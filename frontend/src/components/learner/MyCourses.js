import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

export default function MyCourses() {
  const [userDetails, setUserDetails] = useState(null);
  const [courseList, setCourseList] = useState(null);
  const [courseIdObjects, setCourseIdObjects] = useState([]);
  const [courseDetailsArray, setCourseDetailsArray] = useState([]);

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
  return (
    <div className="container mx-auto">
      <h2
        className="text-3xl font-semibold mb-4"
        style={{ textAlign: "center" }}
      >
        My Courses
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {courseDetailsArray.map((course, index) => (
          <div key={index} className="container relative group">
            <div className="relative">
              <img
                src={course.courseImage}
                alt={course.courseName}
                style={{ width: "100%" }}
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <button className="bg-blue-500 text-white px-6 py-3 mr-4 font-semibold">Go to Course</button>
                <button className="bg-red-500 text-white px-6 py-3 font-semibold">Unenroll</button>
              </div>
            </div>
            <div>
              <div>{course.courseName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}