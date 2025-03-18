import React, { useState } from "react";
import { Link } from "react-router-dom";

function TakeInterviewPage() {
  const [activeTab, setActiveTab] = useState("category"); // 'category' or 'jd'
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const categories = ["CN", "OS", "Coding", "HR Interview", "HR Interview", "DSA",  "DSA",  "DSA",  "DSA"];

  // Map each category to a Tailwind background class (fuchsia-based for a dark theme)
  const categoryStyles = {
   all : "bg-gray-800/90"
  };

  const handleStartCategoryInterview = () => {
    if (!selectedCategory) {
      alert("Please select a category.");
    } else {
      alert(`Starting interview for ${selectedCategory}`);
    }
  };

  const handleStartJDInterview = () => {
    if (!jobDescription.trim() || !resumeFile) {
      alert("Please provide a job description and upload your resume.");
    } else {
      alert("Starting JD & Resume Interview.");
    }
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header with reduced vertical padding */}
      <header className="bg-gray-900 shadow">
        <h1 className="text-center text-lg font-bold text-white">
          Interview Portal
        </h1>
      </header>

      {/* Main Content: Two Cards Side by Side */}
      <main className="flex-grow flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Interview Card */}
          <div className="bg-gray-900/85 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Category Interview
            </h2>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Select a Category
            </h3>
            {/* Flex row to display categories */}
            <div className="flex flex-wrap gap-4 mb-6">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer flex-1 min-w-[100px] py-4 px-2 rounded-lg shadow transition transform hover:scale-105 ${
                    selectedCategory === cat
                      ? "border-4 border-white"
                      : "border border-gray-700"
                  } ${categoryStyles["all"]}`}
                >
                  <p className="text-center text-base font-bold text-white">
                    {cat}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleStartCategoryInterview}
              className="w-full py-2 bg-fuchsia-600 text-white rounded-lg font-semibold hover:bg-fuchsia-700 transition"
            >
              Start Interview
            </button>
          </div>

          {/* JD & Resume Interview Card */}
          <div className="bg-gray-900/85 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              JD &amp; Resume Interview
            </h2>
            <div className="mb-4">
              <label
                htmlFor="jobDescription"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows="5"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter job description..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="resumeUpload"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resumeUpload"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <button
              onClick={handleStartJDInterview}
              className="w-full py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Start Interview
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-2 px-4 shadow">
        <p className="text-center text-gray-500 text-xs">
          &copy; 2025 Interview Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default TakeInterviewPage;
