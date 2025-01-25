import React, { useState, useEffect, useRef } from "react";
import { IoPersonOutline } from "react-icons/io5";
import {
	Chart,
	BarElement,
	LineElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { MdOutlineEventNote } from "react-icons/md";
import AssemblyDropdown from "../components/AssemblyDropdown";
import MonthDropdown from "../components/MonthDropdown";

// Register required components for Chart.js
Chart.register(
	BarElement,
	LineElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement
);

const DashboardOverview = () => {
	const [filteredReports, setFilteredReports] = useState([]);
	const [selectedAssembly, setSelectedAssembly] = useState("All");
	const [selectedMonth, setSelectedMonth] = useState("All");
	const chartRefs = useRef([]);
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const assemblies = ["All", "Central", "Dzorwulu", "English", "Peniel"];

	// Handle Assembly Selection
	const handleAssemblySelect = (assembly) => {
		setSelectedAssembly(assembly);
		if (assembly === "All") {
			setFilteredReports(reports);
		} else {
			setFilteredReports(
				reports.filter((report) => report.assembly === assembly)
			);
		}
	};

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

	const handleMonthSelect = (month) => {
		setSelectedMonth(month);
		if (month === "All") {
			setFilteredReports(reports);
		} else {
			setFilteredReports(reports.filter((report) => report.month === month));
		}
	};

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

	// Log reports after state update
	useEffect(() => {
		console.log("Reports:", reports);
	}, [reports]);

	if (loading) return <div className="text-center py-4">Loading...</div>;
	if (error)
		return <div className="text-center py-4 text-red-500">Error: {error}</div>;
	if (reports.length === 0) {
		return (
			<div className="text-center text-gray-600 dark:text-gray-300">
				No reports found.
			</div>
		);
	}

	// Calculate total souls won
	const totalSoulsWon = filteredReports.reduce(
		(sum, report) => sum + (report.soulsWonCOPCurrent || 0),
		0
	);

	// Calculate total members (example logic, adjust as needed)
	const totalMembers = filteredReports.reduce(
		(sum, report) => sum + (report.totalAttendanceHomeCellsMemberCurrent || 0),
		0
	);

	// Calculate total events held (example logic, adjust as needed)
	const totalEventsHeld = filteredReports.reduce(
		(sum, report) => sum + (report.outreachProgramsCurrent || 0),
		0
	);

	// Prepare data for the Line chart
	const chartData = {
		labels: filteredReports.map((report) => report.assembly),
		datasets: [
			{
				label: "Souls Won",
				data: filteredReports.map((report) => report.soulsWonCOPCurrent),
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				fill: true,
			},
		],
	};

	return (
		<div className="p-3">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
				<h1 className="text-2xl font-semibold mb-2 md:mb-0 dark:text-white">
					Overview
				</h1>
				<div className="flex flex-col md:flex-row md:items-center gap-4">
					<AssemblyDropdown
						assemblies={assemblies}
						onSelect={handleAssemblySelect}
					/>
					<MonthDropdown months={months} onSelect={handleMonthSelect} />
					<button className="px-4 py-2 bg-blue-500 dark:bg-purple-800 text-white rounded-lg transition-colors hover:bg-blue-600 dark:hover:bg-purple-700 hidden">
						Export Report
					</button>
				</div>
			</div>

			{/* Cards Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{/* Souls Won Card */}
				<div className="p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
					<div className="p-4 w-fit mb-3 rounded-lg flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
						<IoPersonOutline className="w-5 h-5 dark:text-white" />
					</div>
					<h2 className="text-sm font-medium text-gray-600 dark:text-purple-700">
						Souls Won (+10% Bonus)
					</h2>
					<p className="text-2xl font-semibold dark:text-white">
						{totalSoulsWon}
					</p>
				</div>

				{/* Total Members */}
				<div className="p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
					<div className="p-4 w-fit mb-3 rounded-lg flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
						<IoPersonOutline className="w-5 h-5 dark:text-white" />
					</div>
					<h2 className="text-sm font-medium text-gray-600 dark:text-purple-700">
						Total Members
					</h2>
					<p className="text-2xl font-semibold dark:text-white">
						{totalMembers}
					</p>
				</div>

				{/* Events Held */}
				<div className="p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
					<div className="p-4 w-fit mb-3 rounded-lg flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
						<MdOutlineEventNote className="w-5 h-5 dark:text-white" />
					</div>
					<h2 className="text-sm font-medium text-gray-600 dark:text-purple-700">
						Events Held
					</h2>
					<p className="text-2xl font-semibold dark:text-white">
						{totalEventsHeld}
					</p>
				</div>
			</div>

			{/* Charts */}
			<h2 className="text-lg font-bold mb-4 dark:text-white">
				Reports Overview
			</h2>
			<div className="mb-8">
				<h3 className="text-md font-semibold mb-2 dark:text-white">
					Attendance
				</h3>
				<Line
					ref={(el) => (chartRefs.current[0] = el?.chartInstance)}
					data={chartData}
					options={{ responsive: true }}
				/>
			</div>
		</div>
	);
};

export default DashboardOverview;
