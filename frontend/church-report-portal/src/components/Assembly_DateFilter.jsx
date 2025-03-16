import React, { useState, useEffect } from "react";
import CustomDatePicker from "../components/CustomDatePicker";
import dayjs from "dayjs";
import AssemblyDropdown from "../components/AssemblyDropdown";

const Assembly_DateFilter = ({ pageTitle }) => {
	const [filteredReports, setFilteredReports] = useState([]);
	const [reports, setReports] = useState([]);
	const [selectedAssembly, setSelectedAssembly] = useState("All");
	const [selectedMonth, setSelectedMonth] = useState("All");
	const [selecteddate, setSelectedDate] = useState("All");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const assemblies = ["All", "Central", "Dzorwulu", "English", "Peniel"];
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

	const handleMonthSelect = (month) => {
		setSelectedMonth(month);
		if (month === "All") {
			setFilteredReports(reports);
		} else {
			setFilteredReports(
				reports.filter((report) => report.step_one.month === month)
			);
		}
	};

	const handleDateSelect = (date) => {
		if (date === "All") {
			setFilteredReports(reports);
			setSelectedDate(date); // Set "All" in the selected date
		} else {
			const formattedDate = dayjs(date).format("YYYY-MM-DD"); // Extract only the date
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

	return (
		<div>
			<div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
				<h1 className="text-2xl font-semibold mb-2 md:mb-0 dark:text-white">
					{pageTitle}
				</h1>
				<div className="flex flex-col md:flex-row md:items-center gap-4">
					<AssemblyDropdown
						assemblies={assemblies}
						onSelect={handleAssemblySelect}
					/>
					<CustomDatePicker onDateChange={handleDateSelect} />
				</div>
			</div>
		</div>
	);
};

export default Assembly_DateFilter;
