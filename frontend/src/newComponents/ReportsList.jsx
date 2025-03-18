import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReportsList() {
  const [search, setSearch] = useState("");

  // Sample Report Data
  const reports = [
    { id: 1, date: "March 10, 2025", score: 80, status: "Good" },
    { id: 2, date: "March 5, 2025", score: 65, status: "Needs Improvement" },
    { id: 3, date: "February 25, 2025", score: 72, status: "Average" },
    { id: 4, date: "February 15, 2025", score: 90, status: "Excellent" },
    { id: 5, date: "January 30, 2025", score: 58, status: "Needs Improvement" },
    { id: 6, date: "January 10, 2025", score: 75, status: "Average" }
  ];

  // Filter Reports based on search
  const filteredReports = reports.filter((report) =>
    report.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 text-center">Your Mock Interview Reports</h1>
      <p className="text-gray-500 text-center mt-2">Track your progress and improve!</p>

      {/* Search Bar */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Reports List in Two Columns */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{report.date}</h2>
                <p
                  className={`text-sm ${
                    report.status === "Needs Improvement"
                      ? "text-red-500"
                      : report.status === "Excellent"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {report.status} ({report.score}%)
                </p>
              </div>
              <Link
                to={`/report/${report.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
              >
                View Report
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No reports found.</p>
        )}
      </div>
    </div>
  );
}



// light theme
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function ReportsList() {
//   const [search, setSearch] = useState("");

//   // Sample Report Data
//   const reports = [
//     { id: 1, date: "March 10, 2025", score: 80, status: "Good" },
//     { id: 2, date: "March 5, 2025", score: 65, status: "Needs Improvement" },
//     { id: 3, date: "February 25, 2025", score: 72, status: "Average" },
//     { id: 4, date: "February 15, 2025", score: 90, status: "Excellent" },
//     { id: 5, date: "January 30, 2025", score: 58, status: "Needs Improvement" },
//     { id: 6, date: "January 10, 2025", score: 75, status: "Average" }
//   ];

//   // Filter Reports based on search
//   const filteredReports = reports.filter((report) =>
//     report.date.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-5xl mx-auto p-6">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-gray-900 text-center">
//           Your Mock Interview Reports
//         </h1>
//         <p className="text-gray-700 text-center mt-2">
//           Track your progress and improve!
//         </p>

//         {/* Search Bar */}
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Search by date..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
//           />
//         </div>

//         {/* Reports List in Two Columns */}
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredReports.length > 0 ? (
//             filteredReports.map((report) => (
//               <div
//                 key={report.id}
//                 className="bg-white p-4 rounded-lg shadow border border-gray-200 flex justify-between items-center"
//               >
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">
//                     {report.date}
//                   </h2>
//                   <p
//                     className={`text-sm ${
//                       report.status === "Needs Improvement"
//                         ? "text-red-500"
//                         : report.status === "Excellent"
//                         ? "text-green-600"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {report.status} ({report.score}%)
//                   </p>
//                 </div>
//                 <Link
//                   to={`/report/${report.id}`}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
//                 >
//                   View Report
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-700 text-center col-span-2">
//               No reports found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
