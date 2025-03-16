import React from "react";
import { useState, useEffect } from "react";
import LoadingState from "../LoadingState";
import ErrorState from "../empty-states/ErrorState";
import NoReportFound from "../empty-states/NoReportFound";
import { FiTrash2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { PiDownloadSimple } from "react-icons/pi";
import { TbCalendarTime } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { TbBuildingChurch } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import dayjs from "dayjs";

const ReportDetail = () => {
	const { id } = useParams();
	const [report, setReport] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isApproved, setIsApproved] = useState(false);

	useEffect(() => {
		const fetchReport = async () => {
			try {
				const response = await fetch(`http://localhost:8000/api/reports/${id}`);
				if (!response.ok) throw new Error("Report not found");

				const data = await response.json();
				setReport(data);
			} catch (error) {
				console.error("Error fetching report:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchReport();
	}, [id]); // Re-fetch if ID changes

	console.log(report);

	const approveReport = async () => {
		try {
			setIsApproved(true);
			console.log("Report Approved");

			// Send API request to update the report
			const response = await fetch(
				`http://localhost:8000/reports/${report.id}/approve`,
				{
					method: "PATCH", // You can also use "PUT"
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ isApproved: true }),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update report");
			}

			const data = await response.json();
			console.log("Updated Report:", data);

			// Update report state after successful API call
			report.isApproved = true;
		} catch (error) {
			console.error("Error approving report:", error);
		}
	};

	const handleDelete = async (reportId) => {
		try {
		  const response = await fetch(`http://localhost:8000/api/reports/${reportId}`, {
			method: "DELETE",
		  });
	  
		  if (!response.ok) throw new Error("Failed to delete report");
	  
		  setReport(report.filter(report => report.id !== reportId)); // Update UI
		} catch (error) {
		  console.error("Error deleting report:", error);
		}
	  };

	  const handleEdit = async (reportId, updatedReportData) => {
		try {
		  const response = await fetch(`http://localhost:8000/api/reports/${reportId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedReportData),
		  });
	  
		  if (!response.ok) throw new Error("Failed to update report");
	  
		  const updatedReport = await response.json();
		  setReport(report.map(report => report.id === reportId ? updatedReport.data : report));
		} catch (error) {
		  console.error("Error updating report:", error);
		}
	  };
	  

	const getDateParts = (dateString) => {
		const date = dayjs(dateString);
		return {
			day: date.format("D"),
			month: date.format("MMMM"),
			year: date.format("YYYY"),
		};
	};

	const dateParts = report ? getDateParts(report.step_one.date) : {};

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
	if (!report) {
		return (
			<div>
				<NoReportFound />
			</div>
		);
	}

	console.log(report);

	const reportData = [
		{
			title: "Soul Winnings",
			data: [
				{
					title: "Outreach Programs",
					current: report.soul_winning.outreachProgramsCurrent,
					previous: report.soul_winning.outreachProgramsPrevious,
					variance: report.soul_winning.outreachProgramsVariance,
				},
				{
					title: "Souls Won (COP Members)",
					current: report.soul_winning.soulsWonCOPCurrent,
					previous: report.soul_winning.soulsWonCOPPrevious,
					variance: report.soul_winning.soulsWonCOPVariance,
				},
				{
					title: "Souls Won (Others)",
					current: report.soul_winning.otherSoulsWonCurrent,
					previous: report.soul_winning.otherSoulsWonPrevious,
					variance: report.soul_winning.otherSoulsWonVariance,
				},
				{
					title: "Souls Won (Gospel Sunday)",
					current: report.soul_winning.soulsWonGospelSundayCurrent,
					previous: report.soul_winning.soulsWonGospelSundayPrevious,
					variance: report.soul_winning.soulsWonGospelSundayVariance,
				},
				{
					title: "Souls Won (Digital Space)",
					current: report.soul_winning.soulsWonDigitalSpaceCurrent,
					previous: report.soul_winning.soulsWonDigitalSpacePrevious,
					variance: report.soul_winning.soulsWonDigitalSpaceVariance,
				},
				{
					title: "Souls Won (Other Religions)",
					current: report.soul_winning.soulsWonOtherReligionsCurrent,
					previous: report.soul_winning.soulsWonOtherReligionsPrevious,
					variance: report.soul_winning.soulsWonOtherReligionsVariance,
				},
				{
					title: "Converts Baptized",
					current: report.soul_winning.convertsBaptizedCurrent,
					previous: report.soul_winning.convertsBaptizedPrevious,
					variance: report.soul_winning.convertsBaptizedVariance,
				},
				{
					title: "Total Home Cells",
					current: report.soul_winning.totalHomeCellsCurrent,
					previous: report.soul_winning.totalHomeCellsPrevious,
					variance: report.soul_winning.totalHomeCellsVariance,
				},
				{
					title: "Home Cell Attendance (Members)",
					current: report.soul_winning.totalAttendanceHomeCellsMembersCurrent,
					previous: report.soul_winning.totalAttendanceHomeCellsMembersPrevious,
					variance: report.soul_winning.totalAttendanceHomeCellsMembersVariance,
				},
				{
					title: "Home Cell Attendance (Members)",
					current:
						report.soul_winning.totalAttendanceHomeCellsNonMembersCurrent,
					previous:
						report.soul_winning.totalAttendanceHomeCellsNonMembersPrevious,
					variance:
						report.soul_winning.totalAttendanceHomeCellsNonMembersVariance,
				},
			],
		},
		{
			title: "Baptism",
			data: [
				{
					title: "Baptized In Holy Spirit Children",
					current: report.baptism.baptizedInHolySpiritChildrenCurrent,
					previous: report.baptism.baptizedInHolySpiritChildrenPrevious,
					variance: report.baptism.baptizedInHolySpiritChildrenVariance,
				},
				{
					title: "No. of New Converts Baptized in Holy Spirit",
					current: report.baptism.baptizedInHolySpiritNewConvertsCurrent,
					previous: report.baptism.baptizedInHolySpiritNewConvertsPrevious,
					variance: report.baptism.baptizedInHolySpiritNewConvertsVariance,
				},
				{
					title: "No. of Old Members Baptized in Holy Spirit",
					current: report.baptism.baptizedInHolySpiritOldMembersCurrent,
					previous: report.baptism.baptizedInHolySpiritOldMembersPrevious,
					variance: report.baptism.baptizedInHolySpiritOldMembersVariance,
				},
				{
					title: "No. of Mid-Week Teaching sessions organized",
					current: report.baptism.midWeekTeachingSessionsCurrent,
					previous: report.baptism.midWeekTeachingSessionsPrevious,
					variance: report.baptism.midWeekTeachingSessionsVariance,
				},
				{
					title: "Converts Baptized",
					current: report.baptism.convertsBaptizedCurrent,
					previous: report.baptism.convertsBaptizedPrevious,
					variance: report.baptism.convertsBaptizedVariance,
				},
				{
					title: "Average attendance at Mid-Week Service",
					current: report.baptism.avgMidWeekServiceAttendanceCurrent,
					previous: report.baptism.avgMidWeekServiceAttendancePrevious,
					variance: report.baptism.avgMidWeekServiceAttendanceVariance,
				},
				{
					title: "No. of Friday Weekly Prayer Sessions Held",
					current: report.baptism.fridayPrayerSessionsCurrent,
					previous: report.baptism.fridayPrayerSessionsPrevious,
					variance: report.baptism.fridayPrayerSessionsVariance,
				},
				{
					title: "Average attendance at Friday Weekly Prayer sessions",
					current: report.baptism.avgFridayPrayerAttendanceCurrent,
					previous: report.baptism.avgFridayPrayerAttendancePrevious,
					variance: report.baptism.avgFridayPrayerAttendanceVariance,
				},
			],
		},
	];

	return (
		<>
			<div className="mb-4">
				<button
					onClick={() => window.history.back()}
					className="text-blue-500 hover:text-blue-700"
				>
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

			<div className="p-4 bg-white dark:bg-[#212121] dark:border-[#333333] rounded-xl shadow">
				<div className="border-[#8f8f8f2c] border-b mb-6 pb-3">
					<div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
						<h4 className="text-3xl font-medium text-gray-600 dark:text-white ">
							{dateParts.year} {dateParts.month} Report Statistics
						</h4>

						<div
							className={`px-3 py-2 w-fit rounded-full flex justify-center items-center shadow-md cursor-pointer  text-xs font-semibold
								 ${
										report.isApproved
											? "bg-[#f0fff1] border border-[#5aff9f] dark:bg-[#223124] text-[#28cf73]"
											: "bg-[#fff4f0] border border-[#ff7e5a] dark:bg-[#312522] text-[#ff805c] dark:text-[#cf4d28]"
									}`}
						>
							<p className="text-nowrap">
								{report.isApproved ? "Approved" : "Pending Approval"}
							</p>
						</div>
					</div>
						<div>
							<p className="text-md font-semibold dark:text-[#8f8f8f] flex items-center gap-1">
								<RxAvatar />
								<span>You</span>
							</p>
							<p className="text-md font-semibold dark:text-[#8f8f8f] flex items-center gap-1">
								<TbBuildingChurch />
								<span>{report.step_one.assembly}</span>
							</p>
							<p className="text-md font-semibold dark:text-[#8f8f8f] flex items-center gap-1">
								<TbCalendarTime />
								<span>
									{dateParts.month} {dateParts.day}, {dateParts.year}{" "}
								</span>
							</p>
						</div>
                        <div className="flex justify-end gap-4 mb-3">
					{!report.isApproved && (
                        <button
						className="p-3 w-fit rounded-md flex-shrink-0 flex justify-center items-center gap-1 shadow-md cursor-pointer dark:bg-[#333333] dark:text-white"
						title="Download Report"
					>
						<MdOutlineEdit className="w-4 h-4 dark:text-white" />
						<span className="text-xs">Edit</span>
					</button>
                    )}
                    </div>
				</div>

				{reportData.map((data, index) => {
					return (
						
							<div
								className="p-4 bg-white dark:bg-[#333333] rounded-xl shadow mb-8"
								key={index}
							>
								<div className="">
									<div>
										<h4 className="text-2xl font-medium text-gray-600 dark:text-white border-[#8f8f8f2c] border-b mb-3 pb-3">
											{data.title}
										</h4>
										{data.data.map((item) => {
											return (
												<>
													{/* Title for the Field */}
													<h3 className="text-lg font-semibold mb-2 dark:text-white">
														{item.title}
													</h3>
													<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-5">
														{/* Current Input */}
														<div>
															<label className="block text-sm font-medium mb-1 dark:text-white">
																CURRENT
															</label>
															<input
																type="number"
																value={item.current}
																className="w-full px-4 py-2 border rounded-md dark:bg-transparent dark:border-gray-600 dark:text-white"
																readOnly
															/>
														</div>

														{/* Previous Input */}
														<div>
															<label className="block text-sm font-medium mb-1 dark:text-white">
																PREVIOUS
															</label>
															<input
																type="number"
																value={item.previous}
																className="w-full px-4 py-2 border rounded-md dark:bg-transparent dark:border-gray-600 dark:text-white"
																readOnly
															/>
														</div>

														{/* Variance Input */}
														<div>
															<label className="block text-sm font-medium mb-1 dark:text-white">
																VARIANCE
															</label>
															<input
																type="number"
																value={item.variance}
																className="w-full px-4 py-2 border rounded-md dark:bg-transparent dark:border-gray-600 dark:text-white"
																readOnly
															/>
														</div>
													</div>
												</>
											);
										})}
									</div>
								</div>
							</div>
					);
				})}

				<div className="border-[#8f8f8f2c] border-t mt-6 pt-3 pb-0">
					<div className="flex justify-end items-center gap-3">
						<div
							className="p-3 w-fit rounded-md flex-shrink-0 flex justify-center items-center gap-1 shadow-md cursor-pointer dark:bg-[#333333] dark:text-white"
							title="Download Report"
						>
							<PiDownloadSimple className="w-4 h-4 dark:text-white" />
							<span className="text-xs"> Download </span>
						</div>
                        {!report.isApproved && (
						<div
							className="p-3 w-fit text-xs rounded-md flex-shrink-0 flex justify-center items-center gap-1 shadow-md cursor-pointer bg-[#9b201a] border border-[#9b1a23] dark:border-[#ff5a5a] dark:bg-[#312222] text-[#fff]"
							title="Download Report"
							onClick={() => handleDelete(report.id)}
						>
							<FiTrash2 className="w-4 h-4 dark:text-white" />
							<span className="text-xs font-medium"> Delete </span>
						</div>
                        )}
					</div>
				</div>
			</div>
		</>
	);
};

export default ReportDetail;
