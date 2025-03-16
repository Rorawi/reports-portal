import React, { useState } from "react";
import dayjs from "dayjs";
import { GoArrowUpRight } from "react-icons/go";
import { PiDownloadSimple } from "react-icons/pi";
import { TbCalendarTime, TbBuildingChurch } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const ReportCard = ({ report }) => {
	const [isApproved, setIsApproved] = useState(false);

	const formatDateToWords = (dateString) => {
		return dayjs(dateString).format("MMMM D, YYYY");
	};

	// Get Date Info for Single Report
	const getDateParts = (dateString) => {
		const date = dayjs(dateString);
		return {
			day: date.format("D"),
			month: date.format("MMMM"),
			year: date.format("YYYY"),
		};
	};

	// Ensure date is properly formatted
	const dateParts = report.step_one?.date
		? getDateParts(report.step_one.date)
		: null;

	return (
		<div key={report.id} className="p-4 bg-white dark:bg-[#212121] dark:border-[#333333] rounded-xl shadow">
			<div className={`px-3 py-2 w-fit mb-3 rounded-full flex justify-center items-center shadow-md cursor-pointer text-xs font-semibold
				${report.isApproved ? "bg-[#f0fff1] border border-[#5aff9f] dark:bg-[#223124] text-[#28cf73]" : "bg-[#fff4f0] border border-[#ff7e5a] dark:bg-[#312522] text-[#ff805c] dark:text-[#cf4d28]"}`}>
				{report.isApproved ? 'Approved' : 'Pending Approval'}
			</div>

			<h4 className="text-xl font-medium text-gray-600 dark:text-white">
				{dateParts
					? `${dateParts.year} ${dateParts.month} Statistics`
					: "No Date Available"}
			</h4>

			<div>
				<p className="text-md font-semibold dark:text-[#8f8f8f] flex items-center gap-1">
					<RxAvatar />
					<span>Christopher Amegah</span>
				</p>
				<p className="text-md font-semibold dark:text-[#8f8f8f] flex items-center gap-1">
					<TbBuildingChurch />
					<span>{report.step_one.assembly}</span>
				</p>
			</div>

			<div className="px-3 py-2 w-fit mt-3 rounded-full flex justify-center items-center gap-1 shadow-md cursor-pointer dark:bg-[#333333] dark:text-[#fff] text-xs font-semibold">
				<TbCalendarTime className="w-4 h-4 dark:text-white" />
				<span>
					<span className="text-[#8f8f8f]">Date Sent: </span>
					{report.step_one.date}
				</span>
			</div>

			<div className="border-[#8f8f8f2c] border-t mt-3 pt-3 pb-0">
				<div className="flex justify-end items-center gap-3">
					<div
						className="p-3 w-fit rounded-full flex-shrink-0 flex justify-center items-center gap-1 shadow-md cursor-pointer dark:bg-[#333333] dark:text-white"
						title="Download Report"
					>
						<PiDownloadSimple className="w-4 h-4 dark:text-white" />
						<span className="text-xs hidden"> Download </span>
					</div>

					<Link
						to={`/reports/${report.id}`}
						className="p-2 pe-3 w-fit rounded-full flex-shrink-0 flex items-center gap-2 shadow-md cursor-pointer dark:bg-[#333333]"
						title="View Report"
					>
						<div
							className="p-2 w-fit rounded-full flex-shrink-0 flex justify-center items-center drop-shadow-xl cursor-pointer dark:bg-[#333333]"
							title="View Report"
						>
							<GoArrowUpRight className="w-3 h-3 dark:text-white" />
						</div>
						<span className="text-xs dark:text-white hidden md:block">
							View Report
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ReportCard;
