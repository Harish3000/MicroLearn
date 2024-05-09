import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { auth, db } from "./components/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import Login from "./components/login";
import SignUp from "./components/register";
import LearnerRoutes from "./components/learner/LearnerRoutes";
import AdminRoutes from "./components/admin/AdminRoutes";
import InstructorRoutes from "./components/instructor/InstructorRoutes";
import TransactionRoutes from "./components/transaction/TransactionRoutes";
import { Spin } from "antd";

function App() {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const docSnap = await getDoc(doc(collection(db, "Users"), user.uid));
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    );
  }

  if (loading) {
    return (
      <div className="flex fixed inset-0 justify-center items-center bg-gray-200">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={`/${role}/`} />} />
          <Route path="/learner/*" element={<LearnerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/instructor/*" element={<InstructorRoutes />} />
          <Route path="/transaction/*" element={<TransactionRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
