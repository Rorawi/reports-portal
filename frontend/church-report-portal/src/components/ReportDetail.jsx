import React from "react";
import { useParams } from "react-router-dom";

const ReportDetail = () => {
  const { id } = useParams();

  // Simulate fetching detailed data based on the ID
  const reportDetails = {
    1: {
      date: "2024-12-05",
      event: "Sunday Service",
      attendance: 120,
      notes: "Great participation with various activities.",
    },
    2: {
      date: "2024-12-04",
      event: "Youth Meeting",
      attendance: 80,
      notes: "Engaging session with guest speakers.",
    },
  };

  const report = reportDetails[id];

  if (!report) {
    return <div className="p-4">Report not found.</div>;
  }

  return (
    <>
<div className="mb-4">
  <button onClick={() => window.history.back()} className="text-blue-500 hover:text-blue-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 inline-block mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
    Back
  </button>
</div>

    <div className="bg-white dark:bg-[#212121] rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Report Details</h2>
      <p className="mb-2 dark:text-gray-300">
        <strong>Date:</strong> {report.date}
      </p>
      <p className="mb-2 dark:text-gray-300">
        <strong>Event:</strong> {report.event}
      </p>
      <p className="mb-2 dark:text-gray-300">
        <strong>Attendance:</strong> {report.attendance}
      </p>
      <p className="dark:text-gray-300">
        <strong>Notes:</strong> {report.notes}
      </p>
    </div>
    </>
  );
};

export default ReportDetail;
