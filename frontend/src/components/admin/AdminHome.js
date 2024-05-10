import React from "react";
import { useNavigate } from "react-router-dom";
import AdminChart from "./AdminChart";

const AdminHome = () => {
  return (
    <div className="mx-8">
      <AdminChart />
      <div className="flex justify-between">
        <Rectangle
          title="Courses"
          text="Manage courses"
          link="/admin/courses"
          icon="📘"
        />
        <Rectangle
          title="Instructors"
          text="Manage instructors"
          link="/admin/AdminHome/instructors"
          icon="👨‍🏫"
        />
        <Rectangle
          title="Users"
          text="Manage users"
          link="/admin/AdminHome/users"
          icon="👥"
        />
        <Rectangle
          title="Transactions"
          text="View user transactions"
          link="/transaction/user"
          icon="💰"
        />
      </div>
    </div>
  );
};

const Rectangle = ({ title, text, link, icon }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-1/4 mx-2 relative">
      <div className="absolute top-0 right-0 mt-1 mr-1 text-4xl">{icon}</div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{text}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        View
      </button>
    </div>
  );
};

export default AdminHome;
