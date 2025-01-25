import React, { useState, useEffect } from "react";
import AssemblyDropdown from "../components/AssemblyDropdown";
import ReportTable from "../components/ReportTable";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import MonthDropdown from "../components/MonthDropdown";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedAssembly, setSelectedAssembly] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const assemblies = ["All", "Central", "Dzorwulu", "English", "Peniel"];
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fetch reports data from the API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/reports");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setReports(data);
        setFilteredReports(data); // Initialize filteredReports with all reports
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Handle Assembly Selection
  const handleAssemblySelect = (assembly) => {
    setSelectedAssembly(assembly);
    filterReports(assembly, selectedMonth);
  };

  // Handle Month Selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    filterReports(selectedAssembly, month);
  };

  // Filter reports based on selected assembly and month
  const filterReports = (assembly, month) => {
    let filtered = reports;

    if (assembly !== "All") {
      filtered = filtered.filter((report) => report.assembly === assembly);
    }

    if (month !== "All") {
      filtered = filtered.filter((report) => report.month === month);
    }

    setFilteredReports(filtered);
  };

  // Calculate summary data
  const totalMembers = filteredReports.reduce(
    (sum, report) => sum + (report.totalAttendanceHomeCellsMemberCurrent || 0),
    0
  );

  const totalEventsHeld = filteredReports.reduce(
    (sum, report) => sum + (report.outreachProgramsCurrent || 0),
    0
  );

  const totalAttendance = filteredReports.reduce(
    (sum, report) => sum + (report.totalAttendanceHomeCellsMemberCurrent || 0),
    0
  );

  const totalFundsRaised = filteredReports.reduce(
    (sum, report) => sum + (report.fundsRaised || 0),
    0
  );

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-3 bg-gray-100 dark:bg-transparent rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h1 className="text-2xl font-semibold mb-2 md:mb-0 dark:text-white">Reports</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <AssemblyDropdown
            assemblies={assemblies}
            onSelect={handleAssemblySelect}
          />
          <MonthDropdown months={months} onSelect={handleMonthSelect} />
          <button className="flex-grow-1 md:flex-grow-0 px-4 py-2 bg-blue-500 dark:bg-purple-800 text-white rounded-lg transition-colors hover:bg-blue-600 dark:hover:bg-purple-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
          <div className="p-4 w-fit mb-3 rounded-lg flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
            <IoPersonOutline className="w-5 h-5 dark:text-white" />
          </div>
          <h2 className="text-sm font-medium text-gray-600 dark:text-purple-700">
            Total Members
          </h2>
          <p className="text-2xl font-semibold dark:text-white">{totalMembers}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
          <div className="p-4 w-fit mb-3 rounded-lg flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
            <MdOutlineEventNote className="w-5 h-5 dark:text-white" />
          </div>
          <h2 className="text-sm font-medium text-gray-600 dark:text-purple-700">
            Events Held
          </h2>
          <p className="text-2xl font-semibold dark:text-white">{totalEventsHeld}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
          <div className="p-4 w-fit mb-3 rounded-lg flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
            <BsPersonCheck className="w-5 h-5 dark:text-white" />
          </div>
          <h2 className="text-sm font-medium text-gray-600 dark:text-purple-700">
            Attendance
          </h2>
          <p className="text-2xl font-semibold dark:text-white">{totalAttendance}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
          <div className="p-4 w-fit mb-3 rounded-lg flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
            <FaRegMoneyBillAlt className="w-5 h-5 dark:text-white" />
          </div>
          <h2 className="text-sm font-medium text-gray-600 dark:text-purple-700">
            Funds Raised
          </h2>
          <p className="text-2xl font-semibold dark:text-white">${totalFundsRaised}</p>
        </div>
      </div>

      {/* Table Section */}
      <ReportTable reports={filteredReports} />

      {/* Charts Section (Optional) */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Visual Data</h2>
        <div className="bg-white dark:bg-[#212121] rounded-lg shadow p-4 dark:text-white">
          <p>Charts Placeholder (e.g., Bar Chart for Attendance Trends)</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;