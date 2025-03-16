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
import NoReportFound from "../components/empty-states/NoReportFound";
import ErrorState from "../components/empty-states/ErrorState";
import LoadingState from "../components/LoadingState";
import { LiaCrossSolid } from "react-icons/lia";
import CustomDatePicker from "../components/CustomDatePicker";
import dayjs from "dayjs";
import { Box } from "@mui/material";

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
	const [selecteddate, setSelectedDate] = useState("All");
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
				reports.filter((report) => report.step_one.assembly === assembly)
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

	useEffect(() => {
		console.log("Fetched Reports:", reports);
	}, [reports]);
	

	const handleMonthSelect = (month) => {
		setSelectedMonth(month);
		if (month === "All") {
			setFilteredReports(reports);
		} else {
			setFilteredReports(
				reports.filter((report) => {
					console.log("Report Step One:", report.step_one);
					return report.step_one.date?.includes(month);
				})
							);
		}
	};

	const handleDateSelect = (date) => {
		if (date === "All") {
		  setFilteredReports(reports);
		  setSelectedDate(date); // Set "All" in the selected date
		} else {
		  const formattedDate = dayjs(date).format("YYYY-MM"); // Extract only the date
		  setSelectedDate(formattedDate);
	  
		  // Log the selected date and the report date for debugging
		  console.log("Selected Date: ", formattedDate);
	  
		  const filteredReports = reports.filter((report) => {
			console.log("Report Date: ", report.step_one.date); // Log the report date
			return report.step_one.date === formattedDate;
		  });
	  
		  setFilteredReports(filteredReports);
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
				console.log("API Response:", data);
		
				// Check if data has the expected year key (e.g., "2025")
				const yearKey = Object.keys(data)[0]; 
				if (yearKey && Array.isArray(data[yearKey])) {
					setReports(data[yearKey]); // Set only the array part
					setFilteredReports(data[yearKey]); 
				} else {
					setReports([]); // Default to an empty array if no data
					setFilteredReports([]);
				}
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

	if (loading)
		return (
			<div className="text-center py-4">
				<LoadingState />
			</div>
		);
	if (error)
		return (
			<div>
				<ErrorState error={error} />
			</div>
		);
	if (reports.length === 0) {
		return (
			<div>
				<NoReportFound />
			</div>
		);
	}

	// Calculate total souls won
	const totalSoulsWon = filteredReports.reduce(
		(sum, report) => sum + (report.soul_winning.soulsWonCOPCurrent || 0),
		0
	);

	// Calculate total members (example logic, adjust as needed)
	const totalMembers = filteredReports.reduce(
		(sum, report) =>
			sum + (report.soul_winning.totalAttendanceHomeCellsMembersCurrent || 0),
		0
	);

	// Calculate total events held (example logic, adjust as needed)
	const totalEventsHeld = filteredReports.reduce(
		(sum, report) => sum + (report.soul_winning.outreachProgramsCurrent || 0),
		0
	);

	// Calculate total baptisms held (example logic, adjust as needed)
	const totalBaptismHeld = filteredReports.reduce(
		(sum, report) => sum + (report.baptism.convertsBaptizedCurrent || 0),
		0
	);

	console.log(totalBaptismHeld);
	

	const uniqueAssemblies = Array.from(
		new Set(filteredReports.map((report) => report.step_one.assembly))
	  );
	  
	  // Prepare data for the Line chart
	  const chartData = {
		labels: uniqueAssemblies, // Using unique assemblies as labels
		datasets: [
		  {
			label: "Souls Won",
			data: uniqueAssemblies.map((assembly) => {
			  // For each unique assembly, sum or take the appropriate value
			  const assemblyData = filteredReports.filter(
				(report) => report.step_one.assembly === assembly
			  );
	  
			  // Log the data for debugging
			  console.log(`Assembly: ${assembly}`, assemblyData);
	  
			  // Assuming you want to sum the soulsWonCOPCurrent values for that assembly
			  const totalSoulsWon = assemblyData.reduce(
				(acc, report) => {
				  // Ensure we access soulsWonCOPCurrent under soul_winning and check if it's available
				  const soulsWon = report.soul_winning?.soulsWonCOPCurrent || 0;
				  console.log("Current Souls Won:", soulsWon); // Log current value
				  return acc + soulsWon; // Sum the soulsWon values
				},
				0
			  );
	  
			  // Log the total for debugging
			  console.log(`Total Souls Won for ${assembly}:`, totalSoulsWon);
	  
			  return totalSoulsWon;
			}),
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
					<CustomDatePicker onDateChange={handleDateSelect} />
				</div>
			</div>

			{/* Cards Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
				{/* Souls Won Card */}
				<div className="p-4 bg-white dark:bg-[#212121] rounded-2xl shadow flex items-center gap-4 h-full">
					<div className="p-4 w-fit rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333]">
						<IoPersonOutline className="w-5 h-5 dark:text-white" />
					</div>
					<div>
						<h6 className="text-sm font-medium text-gray-600 dark:text-[#8d8d8d]">
							Souls Won (+10% Bonus)
						</h6>
						<p className="text-xl font-semibold dark:text-white text-wrap">
							{totalSoulsWon}
						</p>
					</div>
				</div>

				{/* Total Members */}
				<div className="p-4 bg-white dark:bg-[#212121] rounded-2xl shadow flex items-center gap-4 h-full">
					<div className="p-4 w-fit rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333]">
						<IoPersonOutline className="w-5 h-5 dark:text-white" />
					</div>
					<div>
						<p className="text-sm font-medium text-gray-600 dark:text-[#8d8d8d]">
							Total Members
						</p>
						<p className="text-xl font-semibold dark:text-white">
							{totalMembers}
						</p>
					</div>
				</div>

				{/* Events Held */}
				<div className="p-4 bg-white dark:bg-[#212121] rounded-2xl shadow flex items-center gap-4 h-full">
					<div className="p-4 w-fit rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333]">
						<MdOutlineEventNote className="w-5 h-5 dark:text-white" />
					</div>
					<div>
						<p className="text-sm font-medium text-gray-600 dark:text-[#8d8d8d]">
							Events Held
						</p>
						<p className="text-xl font-semibold dark:text-white">
							{totalEventsHeld}
						</p>
					</div>
				</div>
				{/* Events Held */}
				<div className="p-4 bg-white dark:bg-[#212121] rounded-2xl shadow flex items-center gap-4 h-full">
					<div className="p-4 w-fit rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333]">
						<LiaCrossSolid className="w-5 h-5 dark:text-white" />
					</div>
					<div>
						<p className="text-sm font-medium text-gray-600 dark:text-[#8d8d8d]">
							Baptism
						</p>
						<p className="text-xl font-semibold dark:text-white">
							{totalBaptismHeld}
						</p>
					</div>
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
				<Bar
					ref={(el) => (chartRefs.current[0] = el?.chartInstance)}
					data={chartData}
					options={{ responsive: true }}
				/>
			</div>
		</div>
	);
};

export default DashboardOverview;
