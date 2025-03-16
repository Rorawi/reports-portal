import React, { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/empty-states/ErrorState";
import NoReportFound from "../components/empty-states/NoReportFound";
import ReportCard from "../components/ReportCard";
import CustomDatePicker from "../components/CustomDatePicker";
import dayjs from "dayjs";

const ListsOfReports = () => {
	const [filteredReports, setFilteredReports] = useState([]);
	const [selectedAssembly, setSelectedAssembly] = useState("All");
	const [selecteddate, setSelectedDate] = useState("All");
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);



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
	  

	  
	// Fetch reports data from the API
	useEffect(() => {
		const fetchReports = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/reports");
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}
				const data = await response.json();
				
				// Convert the object into an array of reports with a year key
				const formattedReports = Object.entries(data).flatMap(([year, reports]) =>
					reports.map(report => ({ ...report, year })) // Add year to each report
				);
	
				setReports(formattedReports);
				setFilteredReports(formattedReports); // Initialize with all reports
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
	return (
		<div className="p-3 bg-gray-100 dark:bg-transparent rounded-lg">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
				<h1 className="text-2xl font-semibold mb-2 md:mb-0 dark:text-white">
					Reports
				</h1>
				<div className="flex flex-col md:flex-row md:items-center gap-4 hidden">
					<CustomDatePicker onDateChange={handleDateSelect} />
				</div>
			</div>

			{/* Year Section */}
			{[...new Set(filteredReports.map((report) => report.year))].map((year) => (
	<div key={year} className="mb-4">
		<h2 className="text-xl font-semibold mb-4 dark:text-white">
			Year: {year}
		</h2>
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-4 mb-6">
			{filteredReports
				.filter((report) => report.year === year) // Now using the added year property
				.map((report) => (
					<div key={report.id}>
						<ReportCard report={report} />
					</div>
				))}
		</div>
	</div>
))}

		</div>
	);
};

export default ListsOfReports