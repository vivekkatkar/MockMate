import React from 'react';
import { ResumeUpload } from "../Components/ResumeUpload";
import { useNavigate } from 'react-router-dom';

const StartInterview = () => {
  const navigate = useNavigate(); // Use navigate function from react-router

  return (
    <div className="bg-[#0E1217] min-h-screen flex flex-col items-center">
      {/* Main container for ResumeUpload and Start Interview button */}
      <div className="flex flex-col justify-center items-center max-w-4xl">
        <h1 className="text-[#00BFFF] text-3xl md:text-4xl font-bold text-center mb-6">
          Upload Your Resume and Begin the Interview
        </h1>

        {/* Resume Upload Form */}
        <ResumeUpload />

        {/* Start Interview Button */}
        <div className="flex justify-center items-center mt-6">
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
            onClick={() => {
              navigate("/interview");
            }}
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
