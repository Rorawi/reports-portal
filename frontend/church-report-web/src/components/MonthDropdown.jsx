import React, { useState, useEffect, useRef } from "react";

const MonthDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);

  const months = [
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (month) => {
    onChange(month); // Notify the parent of the selected value
    setIsOpen(false); // Close the dropdown
  };

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Dropdown Button */}
<button
  type="button" // Ensure this is not a submit button
  ref={iconRef}
  onClick={toggleDropdown}
  className="w-full bg-white border dark:border-gray-700 dark:bg-[#212121] dark:text-white border-gray-300 rounded-lg px-4 py-2 text-left flex justify-between items-center shadow"
>
  <span>{value || "Select Month"}</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 transform transition-transform ${
      isOpen ? "rotate-180" : "rotate-0"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
</button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 mt-2 bg-white border dark:border-gray-700 dark:bg-[#212121] dark:text-white border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto w-full"
        >
          {months.map((month, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-[#313131] cursor-pointer"
              onClick={() => handleSelect(month)}
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthDropdown;