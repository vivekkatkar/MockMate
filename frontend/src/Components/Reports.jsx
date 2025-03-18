import { useState } from 'react';
import Modal from 'react-modal';

const MockInterviewReports = ({ reports }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const openModal = (report) => {
    setSelectedReport(report);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReport(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mt-10 text-[#00BFFF] text-center">Your Mock Interview Reports:</h3>
      {reports.length === 0 ? (
        <p className="text-center mt-3">No reports available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {Array.isArray(reports) && reports.map((report, index) => (
            <div
              key={index}
              className="bg-[#111827] text-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl p-6 h-64"
            >
              <div className="flex flex-col items-center h-full justify-between">
                <h4 className="text-lg font-semibold mb-2 text-white">
                  Report {index + 1}
                </h4>
                <p className="text-white font-medium text-sm mb-4 text-center overflow-hidden">
                  Feedback: <span className="font-normal">{report.finalReport}</span>
                </p>
                <button
                  onClick={() => openModal(report)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-600 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0"
        closeTimeoutMS={200} 
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 max-h-[80vh] overflow-hidden relative transition-transform transform scale-105">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Details</h2>
          <div className="overflow-y-auto h-[60vh] hide-scrollbar">
            {selectedReport && (
              <div>
                <p className="text-gray-700 mb-4">{selectedReport.finalReport}</p>
              </div>
            )}
          </div>
          <button
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MockInterviewReports;
