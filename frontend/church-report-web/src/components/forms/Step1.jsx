import React from "react";
import AssemblyDropdown from "../AssemblyDropdown";
import MonthDropdown from "../MonthDropdown";
import CustomDatePicker from "../CustomDatePicker";

const Step1 = ({ formData, setFormData }) => {
	const handleAssemblyChange = (selectedAssembly) => {
		console.log("Selected Assembly:", selectedAssembly);
		setFormData((prev) => ({
			...prev,
			step_one: {
				...prev.step_one,
				assembly: selectedAssembly,
			},
		}));
	};

	const handleMonthChange = (selectedMonth) => {
		console.log("Selected Month:", selectedMonth);
		setFormData((prev) => ({
			...prev,
			step_one: {
				...prev.step_one,
				month: selectedMonth,
			},
		}));
	};

	const handleDateChange = (formattedDate, submissionTime) => {
		setFormData((prev) => ({
			...prev,
			step_one: {
				...prev.step_one,
				date: formattedDate,
				submission_time: submissionTime,
			},
		}));
    console.log({ formattedDate, submissionTime });
	};


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			step_one: {
				...prev.step_one,
				[name]: value,
			},
		}));
	};

	return (
		<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
			<h2 className="text-lg font-bold mb-4 dark:text-white">
				Step 1: Basic Details
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Assembly Dropdown */}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-2 dark:text-white">
						Assembly
					</label>
					<AssemblyDropdown
						value={formData.step_one?.assembly || ""}
						onChange={handleAssemblyChange}
					/>
				</div>

				{/* Month Dropdown */}
				{/* <div className="mb-4 hidden">
					<label className="block text-sm font-medium mb-2 dark:text-white">
						Month
					</label>
					<MonthDropdown
						value={formData.step_one?.month || ""}
						onChange={handleMonthChange}
					/>
				</div> */}

				{/* Date Picker Component */}
				<CustomDatePicker
					value={formData.step_one?.date || ""}
					onChange={handleDateChange}
				/>
			</div>

			{/* District Input */}
			<div className="mb-4">
				<label
					htmlFor="district"
					className="block text-sm font-medium mb-2 dark:text-white"
				>
					District
				</label>
				<input
					type="text"
					id="district"
					name="district"
					value={formData.step_one?.district || ""}
					onChange={handleChange}
					className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
				/>
			</div>
		</div>
	);
};

export default Step1;
