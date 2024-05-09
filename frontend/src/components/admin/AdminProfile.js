import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

function AdminProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); // Using useNavigate hook to get the navigation function

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User data not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login"); // Using navigate for navigation
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-1/3 h-3/4 p-10 bg-white rounded shadow-xl overflow-auto">
        {userDetails ? (
          <>
            <h3 className="text-2xl mb-5 text-center">
              Welcome Administrator {userDetails.firstName} To Microlearn
            </h3>
            <div>
              <p>First Name: {userDetails.firstName}</p>
              <p>Last Name: {userDetails.lastName}</p>
              <p>Email: {userDetails.email}</p>
              <p>Role: {userDetails.role}</p>
              <p>User Id : {userDetails.userId}</p>
            </div>

            <button
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              onClick={() => {
                navigate("/admin/user");
              }}
            >
              Go to Demo page
            </button>

            <button
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;
