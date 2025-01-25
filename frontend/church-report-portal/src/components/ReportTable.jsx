import React from "react";
import { useNavigate } from "react-router-dom";

const ReportTable = () => {
  const navigate = useNavigate();

  const reports = [
    {
      id: 1,
      date: "2024-12-05",
      event: "Sunday Service",
      attendance: 120,
      notes: "Great participation",
    },
    {
      id: 2,
      date: "2024-12-04",
      event: "Youth Meeting",
      attendance: 80,
      notes: "Engaging session",
    },
  ];

  const handleRowClick = (id) => {
    navigate(`/reports/${id}`); // Navigate to the detailed report page
  };

  return (
    <div className="bg-white dark:bg-[#212121] rounded-lg shadow p-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Detailed Reports</h2>
      <table className="w-full border-collapse dark:text-white">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">Date</th>
            <th className="border-b py-2 text-left">Event</th>
            <th className="border-b py-2 text-left">Attendance</th>
            <th className="border-b py-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2c2c2c]"
              onClick={() => handleRowClick(report.id)} // Handle row click
            >
              <td className="py-2">{report.date}</td>
              <td className="py-2">{report.event}</td>
              <td className="py-2">{report.attendance}</td>
              <td className="py-2">{report.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
