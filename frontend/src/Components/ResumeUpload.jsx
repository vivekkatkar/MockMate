import React, { useState } from 'react';

export function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const email = localStorage.getItem('email'); // Get email from local storage

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a PDF file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('email', email);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('PDF uploaded successfully!');
      } else {
        setUploadStatus('Error uploading PDF.');
      }
    } catch (err) {
      setUploadStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="w-full h-[30rem] flex items-center justify-center bg-[#111827]">
      <div className="w-[90%] max-w-xl bg-[#1F2937] rounded-xl shadow-lg p-8">
        <h3 className="text-3xl text-white font-bold mb-6 text-center">
          Upload Your Resume
        </h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-200 mb-2">
              Choose a PDF file:
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              className="block w-full text-sm text-gray-300 bg-[#111827] border border-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Upload Resume
          </button>
        </form>
        {uploadStatus && (
          <p className={`mt-4 text-lg font-medium ${uploadStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
}
