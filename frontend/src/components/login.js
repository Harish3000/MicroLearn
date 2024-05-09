import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { collection, doc, getDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const docSnap = await getDoc(doc(collection(db, "Users"), user.uid));
      let role = "profile";
      if (docSnap.exists()) {
        role = docSnap.data().role;
      }
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      window.location.href = `/${role}`;
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-1/4 p-10 bg-white rounded shadow-xl"
      >
        <h3 className="text-2xl mb-5 text-center">Login</h3>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}{" "}
          </button>
        </div>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <p className="inline-block text-sm text-black">
            Are you a new user?{" "}
            <a href="/register" className="text-blue-500">
              Register Here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
