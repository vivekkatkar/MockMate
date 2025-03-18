import React, { useState } from 'react';

const UserDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = { name: 'User Name', email: 'user@example.com' };
  
  const resources = [
    {
      title: 'Lecture Notes',
      description: 'Access the latest lecture slides, recordings, and annotations.',
      count: 12,
    },
    {
      title: 'Assignment Files',
      description: 'Download, complete, and submit assignments seamlessly.',
      count: 5,
    },
    {
      title: 'Reading Materials',
      description: 'Explore curated reading lists, articles, and e-books.',
      count: 20,
    },
  ];

  // Educational insights
  const insights = [
    { label: 'Total Classes', value: 40 },
    { label: 'Total Assignments', value: 15 },
    { label: 'Avg Score', value: 85 },
  ];

  const progress = 70; // Overall progress percentage
  const strengths = ['Math', 'Science', 'History'];
  const weaknesses = ['Art', 'Physical Ed', 'Music'];

  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev);
  };

  // Circular progress calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  // Define target values for statistics
  const progressTargets = {
    'Total Classes': 50,
    'Total Assignments': 20,
    'Avg Score': 100,
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 flex flex-col items-center border-b border-blue-700">
          <img src="/path-to-logo.png" alt="Logo" className="w-16 h-16 rounded-full mb-2" />
          <h2 className="text-2xl font-bold">EduPortal</h2>
        </div>
        <nav className="flex-1 p-6">
          <ul className="space-y-4">
            <li>
              <a href="#dashboard" className="block w-full p-3 rounded hover:bg-blue-800 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#detailed-reports" className="block w-full p-3 rounded hover:bg-blue-800 transition">
                Detailed Reports
              </a>
            </li>
            <li>
              <a href="#take-interview" className="block w-full p-3 rounded hover:bg-blue-800 transition">
                Take Interview
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700 shadow-sm">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="relative">
            <button onClick={toggleProfile} className="focus:outline-none">
              <img src="/path-to-profile-pic.jpg" alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-300" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <img src="/path-to-profile-pic.jpg" alt="Profile" className="w-16 h-16 rounded-full border-2 border-blue-300" />
                  <div>
                    <p className="text-xl font-bold">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button className="w-full mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Container */}
        <main className="p-6">
          <div className="max-w-screen-lg mx-auto space-y-8">
            {/* Resources Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="mb-2 text-sm text-gray-400">{resource.description}</p>
                    <p className="text-sm text-blue-400 font-medium">{resource.count} available</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Insights Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.map((insight, index) => {
                  const target = progressTargets[insight.label] || 100;
                  const percentage = Math.round((insight.value / target) * 100);
                  return (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700 text-center">
                      <h3 className="text-lg font-semibold mb-2">{insight.label}</h3>
                      <p className="text-3xl font-bold mb-4">{insight.value}</p>
                      {insight.label === 'Total Classes' && (
                        <div className="w-full bg-blue-800 h-2 rounded">
                          <div className="h-2 rounded bg-blue-400" style={{ width: `${percentage}%` }}></div>
                        </div>
                      )}
                      {insight.label === 'Total Assignments' && (
                        <div className="w-full bg-purple-800 h-2 rounded">
                          <div className="h-2 rounded bg-purple-400" style={{ width: `${percentage}%` }}></div>
                        </div>
                      )}
                      {insight.label === 'Avg Score' && (
                        <div className="w-full bg-green-800 h-2 rounded">
                          <div className="h-2 rounded bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${percentage}%` }}></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Overall Progress with Circular Progress */}
            <section className="flex flex-col items-center border-2 border-blue-300 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full">
                <svg className="w-24 h-24">
                  <circle
                    className="text-gray-600"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                  />
                  <circle
                    className="text-blue-600"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{progress}%</span>
                </div>
              </div>
            </section>

            {/* Strengths & Weaknesses Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Strengths &amp; Weaknesses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow border border-green-700">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">Strengths</h3>
                  <div className="flex flex-wrap">
                    {strengths.map((topic, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 border-2 border-green-700 rounded-full px-4 py-2 m-2 text-green-400 font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow border border-red-700">
                  <h3 className="text-xl font-semibold mb-4 text-red-400">Weaknesses</h3>
                  <div className="flex flex-wrap">
                    {weaknesses.map((topic, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 border-2 border-red-700 rounded-full px-4 py-2 m-2 text-red-400 font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
