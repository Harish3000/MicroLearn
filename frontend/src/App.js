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

function App() {
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const docSnap = await getDoc(doc(collection(db, "Users"), user.uid));
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={`/${role}/*`} /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/learner/*" element={<LearnerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/instructor/*" element={<InstructorRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
