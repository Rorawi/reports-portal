import React, { useState,useEffect,useRef } from "react";

const AssemblyDropdown = ({ assemblies, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAssembly, setSelectedAssembly] = useState("Select Assembly");
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (assembly) => {
    setSelectedAssembly(assembly);
    onSelect(assembly); // Call the parent-provided function
    setIsOpen(false);
  };

   // Close dropdown if click is outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if the click is outside both the dropdown and the icon
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close dropdown
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative md:w-64">
      {/* Dropdown Button */}
      <button
              ref={iconRef}
        onClick={toggleDropdown}
        className="w-full flex-grow-1 md:flex-grow-0  bg-white border dark:border-gray-700 dark:bg-[#212121] dark:text-white border-gray-300 rounded-lg px-4 py-2 text-left flex justify-between items-center shadow"
      >
        <span>{selectedAssembly}</span>
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
        className="absolute z-10 mt-2  bg-white border dark:border-gray-700 dark:bg-[#212121] dark:text-white border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto w-full">
          {assemblies.map((assembly, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-[#313131] cursor-pointer"
              onClick={() => handleSelect(assembly)}
            >
              {assembly}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssemblyDropdown;
