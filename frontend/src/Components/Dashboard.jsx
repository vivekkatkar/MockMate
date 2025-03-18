import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import MockInterviewReports from "../Components/Reports.jsx";
import { ResumeUpload } from "./ResumeUpload";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (email == null) {
      navigate("/login");
    } else {
      const data = {
        userdata: {
          email: email,
        },
      };

      axios
        .post("http://localhost:3000/user/getUser", data)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
          setLoading(false);
        });
    }
  }, [email, navigate]);

  if (loading) {
    return  <div className="flex items-center justify-center h-screen">
    <HashLoader color="#d1d5db" />
    </div>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const [userEmail, userName, userId, reports] = userData;

  const calculateAverageAccuracy = (accuracyArray) => {
    const total = accuracyArray.reduce((acc, curr) => acc + curr, 0);
    return (total / accuracyArray.length).toFixed(2);
  };
  return (
    // <div className="container h-scre mx-auto p-5 bg-white">
 <div className="container mx-auto p-5 bg-[#0E1217]"> 
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 max-w-sm bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
  <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 flex flex-col items-center">
    <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg border-4 border-blue-400">
      <FaUserCircle className="text-4xl md:text-5xl text-blue-600" />
    </div>
    <div className="mt-4 text-center">
      <h2 className="text-xl md:text-2xl font-bold">{userName}</h2>
      {/* <p className="text-sm md:text-md mt-1">Admin</p> */}
    </div>
  </div>

  <div className="p-6">
    <div className="inline-flex items-center bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700 w-full">
      <div className="mr-3 text-blue-400">
        <FaEnvelope className="text-2xl" />
      </div>
      <div>
        <h3 className="text-md font-semibold">Email</h3>
        <p className="text-gray-300">{userEmail}</p>
      </div>
    </div>
  </div>
</div>


        {/* Mock Interview Reports Below the Card */}
        <div className="w-full">
          <MockInterviewReports reports={reports} />
        </div>
      </div>
    </div>
);


};

export default Dashboard;
