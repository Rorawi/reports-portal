import React, { useState, useEffect } from "react";
import SoulWinningForm from "../components/forms/SoulWinningForm";
import Step1 from "../components/forms/Step1";
import Baptism from "../components/forms/Baptism";
import ThankYou from "../components/ThankYou";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		step_one: {
			assembly: "",
			district: "",
			date: "",
			submission_time: "",
		},

		// Soul Winning
		soul_winning: {
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
			totalAttendanceHomeCellsMembersCurrent: 0,
			totalAttendanceHomeCellsMembersPrevious: 0,
			totalAttendanceHomeCellsMembersVariance: null,
			totalAttendanceHomeCellsNonMembersCurrent: 0,
			totalAttendanceHomeCellsNonMembersPrevious: 0,
			totalAttendanceHomeCellsNonMembersVariance: null,
		},

		// Baptism
		baptism: {
			baptizedInHolySpiritChildrenCurrent: 0,
			baptizedInHolySpiritChildrenPrevious: 0,
			baptizedInHolySpiritChildrenVariance: null,
			baptizedInHolySpiritNewConvertsCurrent: 0,
			baptizedInHolySpiritNewConvertsPrevious: 0,
			baptizedInHolySpiritNewConvertsVariance: null,
			baptizedInHolySpiritOldMembersCurrent: 0,
			baptizedInHolySpiritOldMembersPrevious: 0,
			baptizedInHolySpiritOldMembersVariance: null,
			midWeekTeachingSessionsCurrent: 0,
			midWeekTeachingSessionsPrevious: 0,
			midWeekTeachingSessionsVariance: null,
			avgMidWeekServiceAttendanceCurrent: 0,
			avgMidWeekServiceAttendancePrevious: 0,
			avgMidWeekServiceAttendanceVariance: null,
			fridayPrayerSessionsCurrent: 0,
			fridayPrayerSessionsPrevious: 0,
			fridayPrayerSessionsVariance: null,
			convertsBaptizedCurrent: 0,
			convertsBaptizedPrevious: 0,
			convertsBaptizedVariance: null,
			avgFridayPrayerAttendanceCurrent: 0,
			avgFridayPrayerAttendancePrevious: 0,
			avgFridayPrayerAttendanceVariance: null,
		},
	});
	const [isDraft, setIsDraft] = useState(false); // Default to false (final submission)
	const [draftData, setDraftData] = useState(formData);
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [reportId, setReportId] = useState(null);
	const navigate = useNavigate();

	// Toggle between draft and final submission
	const handleDraftToggle = () => setIsDraft(!isDraft);

	// Initialize the date field with the current date
	useEffect(() => {
		setFormData((prev) => {
			if (!prev.step_one?.date) {
				return {
					...prev,
					step_one: {
						...prev.step_one,
						date: dayjs().format("YYYY-MM-DD"),
					},
				};
			}
			return prev;
		});
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		// Handle fields that are part of the soul_winning, baptism, or other steps
		if (name.includes(".")) {
			const [step, fieldName] = name.split(".");

			// Check if this step exists in form data, if not, initialize it
			setFormData((prev) => {
				const updatedStepData = {
					...prev[step], // Copy existing step data (e.g., soul_winning, baptism)
					[fieldName]: Number(value), // Update the specific field with the new value
				};

				// Handle variance calculation for Current/Previous fields
				if (fieldName.includes("Current") || fieldName.includes("Previous")) {
					const baseName = fieldName.replace(/Current|Previous/, "");
					const current = Number(updatedStepData[`${baseName}Current`] || 0);
					const previous = Number(updatedStepData[`${baseName}Previous`] || 0);
					updatedStepData[`${baseName}Variance`] = current - previous;
				}

				return { ...prev, [step]: updatedStepData }; // Update the step data in the state
			});
		} else {
			// Handle other fields that don't belong to a specific step
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const validateStep = () => {
		const newErrors = {};

		if (currentStep === 1) {
			const requiredFields = ["assembly", "district", "date"];
			requiredFields.forEach((field) => {
				if (!formData.step_one[field]) {
					newErrors[field] = "This field is required";
				}
			});
		} else if (currentStep === 2) {
			// Validate Step 2 (soul_winning, baptism, etc.)
			Object.keys(formData.soul_winning || {}).forEach((field) => {
				if (formData.soul_winning[field] === "") {
					newErrors[`soul_winning.${field}`] = "This field is required";
				}
			});
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePrev = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};

	const handleNext = () => {
		if (!validateStep()) return; // Prevent moving forward if validation fails
		setCurrentStep((prev) => prev + 1);
	};

	const generatePayload = (formData) => {
		return {
			step_one: {
				assembly: formData.step_one.assembly || "",
				district: formData.step_one.district || "",
				date: formData.step_one.date || "",
			},
			soul_winning: Object.keys(formData.soul_winning || {}).reduce(
				(acc, key) => {
					acc[key] =
						formData.soul_winning[key] !== undefined &&
						formData.soul_winning[key] !== ""
							? Number(formData.soul_winning[key])
							: 0;
					return acc;
				},
				{}
			),
			baptism: Object.keys(formData.baptism || {}).reduce((acc, key) => {
				acc[key] =
					formData.baptism[key] !== undefined && formData.baptism[key] !== ""
						? Number(formData.baptism[key])
						: 0;
				return acc;
			}, {}),
		};
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Ensure form submission only runs ONCE
		if (currentStep !== 3) return;

		setLoading(true);

		const payload = generatePayload(formData);

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
			// Access ID inside `data.data`
			if (data.data && data.data.id) {
				console.log("Extracted Report ID:", data.data.id);
				setReportId(data.data.id);
				setSubmissionSuccess(true);
			} else {
				console.error("Report ID is undefined in response");
			}
		} catch (error) {
			console.error("Submission Error: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-3 bg-gray-100 dark:bg-transparent rounded-lg">
			<form>
				{submissionSuccess ? (
					<ThankYou reportId={reportId} />
				) : (
					<>
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
						{currentStep === 3 && (
							<Baptism
								formData={formData}
								setFormData={setFormData}
								handleChange={handleChange}
								errors={errors}
							/>
						)}
						{/* {currentStep === 3 && (
					<Offetory
						formData={formData}
						setFormData={setFormData}
						handleChange={handleChange}
						errors={errors}
					/>
				)} */}
					</>
				)}
			</form>

			{!submissionSuccess && (
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
					{currentStep < 3 ? (
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
							onClick={handleSubmit}
						>
							{loading ? "Submitting..." : "Submit"}
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default ReportForm;
