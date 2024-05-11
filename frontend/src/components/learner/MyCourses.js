import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

export default function MyCourses() {
    const [userDetails, setUserDetails] = useState(null);
    const [courseList, setCourseList] = useState(null);
    const [courseIdObjects, setCourseIdObjects] = useState([]);

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
        const fetchCourseList = async() => {
            // Check if userDetails and userDetails.userId exist before making the API call
            if (userDetails?.userId) {
                try {
                    const response = await axios.get(`/learner/get-one-learner/${userDetails.userId}`);
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
          const courseIdObjects = courseList.courseIdList.map(courseId => ({ id: courseId }));
          setCourseIdObjects(courseIdObjects);
      }
  }, [courseList]);
      
    return (
        <div>
            
        </div>
    );
}