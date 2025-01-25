import React, { useState } from "react";
import axios from "axios";
import AssemblyDropdown from "../components/AssemblyDropdown";
import MonthDropdown from "../components/MonthDropdown";
import SoulWinningForm from "../components/forms/SoulWinningForm";
import Step1 from "../components/forms/Step1";

const ReportForm = () => {
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);

	const [formData, setFormData] = useState({
		assembly: "",
		month: "",
		district: "",
		outreachProgramsCurrent: 0,
		outreachProgramsPrevious: 0,
		outreachProgramsVariance: null,
		soulsWonCOPCurrent: 0,
		soulsWonCOPPrevious: 0,
		soulsWonCOPVariance: null,
		otherSoulsWonCurrent: 0,
		otherSoulsWonPrevious: 0,
		otherSoulsWonVariance: null,
		soulsWonGospelSundayCurrent: 0,
		soulsWonGospelSundayPrevious: 0,
		soulsWonGospelSundayVariance: null,
		soulsWonDigitalSpaceCurrent: 0,
		soulsWonDigitalSpacePrevious: 0,
		soulsWonDigitalSpaceVariance: null,
		soulsWonOtherReligionsCurrent: 0,
		soulsWonOtherReligionsPrevious: 0,
		soulsWonOtherReligionsVariance: null,
		convertsBaptizedCurrent: 0,
		convertsBaptizedPrevious: 0,
		convertsBaptizedVariance: null,
		totalHomeCellsCurrent: 0,
		totalHomeCellsPrevious: 0,
		totalHomeCellsVariance: null,
		totalAttendanceHomeCellsMemberCurrent: 0,
		totalAttendanceHomeCellsMemberPrevious: 0,
		totalAttendanceHomeCellsMemberVariance: null,
		totalAttendanceHomeCellsNonMemberCurrent: 0,
		totalAttendanceHomeCellsNonMemberPrevious: 0,
		totalAttendanceHomeCellsNonMemberVariance: null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedFormData = { ...formData, [name]: value };

		// Calculate variance if applicable
		if (name.includes("Current") || name.includes("Previous")) {
			const baseName = name.replace(/Current|Previous/, "");
			const current = Number(updatedFormData[`${baseName}Current`] || 0);
			const previous = Number(updatedFormData[`${baseName}Previous`] || 0);

			if (!isNaN(current) && !isNaN(previous)) {
				updatedFormData[`${baseName}Variance`] = current - previous;
			} else {
				updatedFormData[`${baseName}Variance`] = null;
			}
		}

		setFormData(updatedFormData);

		// Validate input
		if (Number(value) < 0) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: "Value cannot be negative",
			}));
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: "",
			}));
		}
	};

	const validateStep = () => {
		const requiredFields =
			currentStep === 1 ? ["assembly", "month", "district"] : [];
		const newErrors = {};

		requiredFields.forEach((field) => {
			if (!formData[field]) {
				newErrors[field] = "This field is required";
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePrev = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};

	const handleNext = () => {
		if (validateStep()) {
			setCurrentStep((prevStep) => prevStep + 1);
		}
	};

	const generatePayload = (formData) => {
		const payload = { ...formData }; // Create a copy of formData

		// Parse numeric fields as integers
		Object.keys(payload).forEach((key) => {
			if (
				key.includes("Current") ||
				key.includes("Previous") ||
				key.includes("Variance")
			) {
				payload[key] = parseInt(payload[key]) || 0;
			}
		});

		return payload;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		// if (
		// 	formData.assembly === "Select Assembly" ||
		// 	formData.month === "Select Month" ||
		// 	formData.district === "Select District"
		// ) {
		// 	console.error("All fields are required!");
		// 	setLoading(false);
		// 	return;
		// }

		const payload = generatePayload(formData);

		// Log the payload to verify it includes all fields
		console.log("Submitting Payload: ", JSON.stringify(payload, null, 2));

		try {
			const response = await fetch("http://localhost:8000/api/reports", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) throw new Error(`Error: ${response.status}`);
			const data = await response.json();
			console.log("Response: ", data);
		} catch (error) {
			console.error("Submission Error: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-3 bg-gray-100 dark:bg-transparent rounded-lg">
			<form onSubmit={handleSubmit}>
				{/* Render the current step */}
				{currentStep === 1 && (
					<Step1
						formData={formData}
						setFormData={setFormData}
						handleChange={handleChange}
						errors={errors}
					/>
				)}
				{currentStep === 2 && (
					<SoulWinningForm
						formData={formData}
						setFormData={setFormData}
						handleChange={handleChange}
						errors={errors}
					/>
				)}

				{/* Navigation Buttons */}
				<div className="flex justify-between mt-4">
					{currentStep > 1 && (
						<button
							type="button"
							className="px-4 py-2 bg-gray-300 rounded-md"
							onClick={handlePrev}
						>
							Previous
						</button>
					)}
					{currentStep < 2 ? (
						<button
							type="button"
							className="px-4 py-2 bg-blue-500 text-white rounded-md"
							onClick={handleNext}
						>
							Next
						</button>
					) : (
						<button
							type="submit"
							className={`px-8 py-2 rounded-md ${
								loading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-600 text-white hover:bg-blue-700"
							}`}
							disabled={loading}
						>
							{loading ? "Submitting..." : "Submit"}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default ReportForm;
