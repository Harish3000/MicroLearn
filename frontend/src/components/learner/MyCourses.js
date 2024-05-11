import React, { useEffect, useState }  from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

export default function MyCourses() {

    const [userDetails, setUserDetails] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

  return (
    <div>

    </div>
  )
}
