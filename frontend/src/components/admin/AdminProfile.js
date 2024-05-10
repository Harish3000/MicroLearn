import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd"; // Import Spin component from Ant Design

function AdminProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          setLoading(false); // Set loading to false when data is fetched
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
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-1/3 h-3/4 p-10 bg-white rounded shadow-xl overflow-auto text-center">
        {loading ? ( // Render Spin component if loading is true
          <div className="flex justify-center items-center h-full">
            <Spin size="large" /> {/* Ant Design Spinner with size large */}
          </div>
        ) : (
          <>
            <h3 className="text-2xl mb-5">
              Welcome Administrator {userDetails.firstName} to Microlearn
            </h3>

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwLU2SOv3DpPLkV_pR-kAR4GA69MaJh19Svz-sH4U5oQ&s"
              alt="Microlearn Logo"
              className="mx-auto mt-5 w-32 h-32" // Reduced the size of the image using w-32 and h-32 classes
            />
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
                navigate("/admin");
              }}
            >
              Home page
            </button>

            <button
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;
