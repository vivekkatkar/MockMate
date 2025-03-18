

// dark theme

// export default function SingleReport() {
//     const report = {
//       overallScore: 75,
//       improvementAreas: ["Data Structures: Trees", "System Design", "Behavioral Questions"],
//       questions: [
//         {
//           id: 1,
//           question: "Explain the difference between BFS and DFS.",
//           userResponse: "BFS explores neighbors first while DFS goes deep into the tree...",
//           feedback: "Your explanation was good, but you missed time complexity analysis.",
//           improvementScore: 6,
//           suggestedResources: [
//             { title: "BFS vs DFS Guide", link: "https://example.com/bfs-dfs" },
//             { title: "Graph Traversal Techniques", link: "https://example.com/graph-traversal" }
//           ]
//         },
//         {
//           id: 2,
//           question: "How would you design a URL shortener like Bitly?",
//           userResponse: "I would use a hashing function...",
//           feedback: "Consider database sharding and unique key generation strategies.",
//           improvementScore: 5,
//           suggestedResources: [
//             { title: "System Design for URL Shortener", link: "https://example.com/url-shortener" }
//           ]
//         }
//       ]
//     };
  
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-800">Mock Interview Report</h1>
//           <p className="text-gray-500 mt-2">Review your performance and improve!</p>
//         </div>
  
//         {/* Summary Section */}
//         <div className="bg-blue-50 p-4 rounded-lg mt-6 shadow-md">
//           <h2 className="text-xl font-semibold text-blue-800">Overall Performance</h2>
//           <div className="mt-3 flex items-center">
//             <span className="text-3xl font-bold text-blue-600">{report.overallScore}%</span>
//             <p className="ml-3 text-gray-600">Improvement Needed</p>
//           </div>
//         </div>
  
//         {/* Question Breakdown */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-800">Question Analysis</h2>
//           <div className="space-y-4 mt-4">
//             {report.questions.map((q) => (
//               <div key={q.id} className="bg-white p-4 rounded-lg shadow-md">
//                 <h3 className="font-semibold text-gray-800">{q.question}</h3>
//                 <p className="mt-2 text-gray-700"><strong>Your Response:</strong> {q.userResponse}</p>
//                 <p className="mt-2 text-gray-600"><strong>Feedback:</strong> {q.feedback}</p>
//                 <p className="mt-2"><strong>Improvement Score:</strong> <span className="text-blue-600">{q.improvementScore}/10</span></p>
  
//                 {/* Suggested Resources */}
//                 <div className="mt-3">
//                   <h4 className="text-sm font-semibold text-gray-700">Suggested Resources:</h4>
//                   <ul className="list-disc list-inside text-blue-500">
//                     {q.suggestedResources.map((res, index) => (
//                       <li key={index}>
//                         <a href={res.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
//                           {res.title}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
  
//         {/* Areas to Improve */}
//         <div className="mt-8 bg-yellow-50 p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-yellow-800">Areas to Improve</h2>
//           <ul className="mt-2 list-disc list-inside text-gray-700">
//             {report.improvementAreas.map((area, index) => (
//               <li key={index}>{area}</li>
//             ))}
//           </ul>
//         </div>
  
//         {/* Call to Action */}
//         <div className="mt-6 flex justify-center">
//           <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
//             Retake Interview
//           </button>
//         </div>
//       </div>
//     );
//   }
  


// Lighter theme 
export default function SingleReport() {
  const report = {
    overallScore: 75,
    improvementAreas: [
      "Data Structures: Trees",
      "System Design",
      "Behavioral Questions"
    ],
    questions: [
      {
        id: 1,
        question: "Explain the difference between BFS and DFS.",
        userResponse:
          "BFS explores neighbors first while DFS goes deep into the tree...",
        feedback:
          "Your explanation was good, but you missed time complexity analysis.",
        improvementScore: 6,
        suggestedResources: [
          { title: "BFS vs DFS Guide", link: "https://example.com/bfs-dfs" },
          { title: "Graph Traversal Techniques", link: "https://example.com/graph-traversal" }
        ]
      },
      {
        id: 2,
        question: "How would you design a URL shortener like Bitly?",
        userResponse: "I would use a hashing function...",
        feedback:
          "Consider database sharding and unique key generation strategies.",
        improvementScore: 5,
        suggestedResources: [
          { title: "System Design for URL Shortener", link: "https://example.com/url-shortener" }
        ]
      }
    ]
  };

  const improvementPercentage = (score) => (score / 10) * 100;

  return (
    <div className="min-h-screen bg-gray-110  ">
      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto pr-8 pl-4 py-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
          Interview Report
        </h1>

        {/* Overview Section */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Performance Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  className="text-gray-300"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="48"
                  cx="56"
                  cy="56"
                />
                <circle
                  className="text-indigo-500"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={(2 * Math.PI * 48) * (1 - report.overallScore / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="48"
                  cx="56"
                  cy="56"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">{report.overallScore}%</span>
              </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">Overall Performance</h2>
            <p className="text-gray-500 mt-1">Your interview performance summary</p>
          </div>
          {/* Improvement Areas Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Improvement Areas</h3>
            <div className="flex flex-wrap gap-3">
              {report.improvementAreas.map((area, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-full transition">
                Get Personalized Tips
              </button>
            </div>
          </div>
        </section>

        {/* Detailed Analysis Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Detailed Question Analysis</h3>
          <div className="grid gap-6">
            {report.questions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition">
                <h4 className="text-lg font-semibold text-gray-800">{q.question}</h4>
                <div className="mt-3 space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Your Answer:</span> {q.userResponse}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Feedback:</span> {q.feedback}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 text-sm mb-1">Improvement Score: {q.improvementScore}/10</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${improvementPercentage(q.improvementScore)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-md font-semibold text-gray-700 mb-2">Recommended Resources:</h5>
                  <ul className="list-disc list-inside text-sm">
                    {q.suggestedResources.map((res, index) => (
                      <li key={index}>
                        <a
                          href={res.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          {res.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transition">
            Retake Interview
          </button>
        </section>
      </main>
    </div>
  );
}
