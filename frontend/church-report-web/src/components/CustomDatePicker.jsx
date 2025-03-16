import React, { useMemo, useCallback } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const getCustomTheme = (themeMode) =>
	createTheme({
		palette: {
			mode: themeMode,
			primary: {
				main: themeMode === "dark" ? "#bb86fc" : "#0d47a1",
			},
			background: {
				default: themeMode === "dark" ? "#121212" : "#ffffff",
				paper: themeMode === "dark" ? "#1e1e1e" : "#ffffff",
			},
			text: {
				primary: themeMode === "dark" ? "#ffffff" : "#000000",
			},
		},
		components: {
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						backgroundColor: themeMode === "dark" ? "#333" : "#fff",
						color: themeMode === "dark" ? "#fff" : "#000",
						borderRadius: "6px",
						border: "2px solid",
						borderColor: themeMode === "dark" ? "#bb86fc" : "#2196f3",
						"&:hover": {
							borderColor: themeMode === "dark" ? "#d18aff" : "#1976d2",
						},
					},
					input: {
						color: themeMode === "dark" ? "#fff" : "#000",
					},
				},
			},
			MuiPickersToolbar: {
				styleOverrides: {
					root: {
						backgroundColor: themeMode === "dark" ? "#bb86fc" : "#0d47a1",
						color: themeMode === "dark" ? "#000" : "#fff",
					},
				},
			},
		},
	});

const CustomDatePicker = ({ value, onChange, themeMode = "light" }) => {
	// Memoize theme to avoid unnecessary re-renders
	const theme = useMemo(() => getCustomTheme(themeMode), [themeMode]);

	// Memoize dayjs value to prevent new object creation on every render
	const parsedValue = useMemo(() => (value ? dayjs(value) : null), [value]);

	// Memoize function to prevent unnecessary re-renders
	const handleDateChange = useCallback(
		(selectedDate) => {
			if (!selectedDate) return;
			const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
			const submissionTime = dayjs().format("HH:mm:ss");
			onChange(formattedDate, submissionTime);
		},
		[onChange]
	);

	return (
		<ThemeProvider theme={theme}>
			<div className="mb-4">
				<label className="block text-sm font-medium mb-2 dark:text-white">
					Date
				</label>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker value={parsedValue} onChange={handleDateChange} 
					        views={[ "year","month","day"]}
					/>
				</LocalizationProvider>
			</div>
		</ThemeProvider>
	);
};

export default CustomDatePicker;
