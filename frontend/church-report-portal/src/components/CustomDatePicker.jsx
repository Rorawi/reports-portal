import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CustomDatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateChange(date ? dayjs(date).format("YYYY-MM") : null); // Format it correctly
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Month and Year"
        value={selectedDate}
        onChange={handleChange}
        views={["year", "month"]}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
