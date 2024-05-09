import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("learner");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLastUserId = async () => {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, orderBy("userId", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      let lastUserId = "USER001";
      querySnapshot.forEach((doc) => {
        const userId = doc.data().userId;
        if (userId) {
          const userNumber = parseInt(userId.replace("USER", ""), 10);
          lastUserId = `USER${String(userNumber + 1).padStart(3, "0")}`;
        }
      });
      setUserId(lastUserId);
    };

    fetchLastUserId();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          userId: userId,
          email: user.email,
          firstName: fname,
          lastName: lname,
          role: role,
        });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleRegister}
        className="w-1/3 h-8/10 p-10 bg-white rounded shadow-xl overflow-auto"
      >
        <h3 className="text-2xl mb-2 text-center">Sign Up</h3>

        <div className="mb-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            First name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Last name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            User ID
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={userId}
            readOnly
          />
        </div>

        <div className="mb-2">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Role
          </label>
          <select
            className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="learner">learner</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        <div className="mb-2 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        <hr className="mb-1 border-t" />
        <div className="text-center">
          <p className="inline-block text-sm text-black align-baseline">
            Already registered?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
