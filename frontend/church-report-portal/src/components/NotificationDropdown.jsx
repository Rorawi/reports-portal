import React, { useState, useRef, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
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
    <div className="relative">
      {/* Notification Icon */}
      <button
        ref={iconRef}
        className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333]"
        onClick={toggleDropdown}
      >
        <IoMdNotificationsOutline className="w-5 h-5 dark:text-white" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#212121] shadow-lg rounded-lg p-4 z-50"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Notifications
          </h3>
          <ul className="space-y-2">
            <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                New message from John
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                5 mins ago
              </span>
            </li>
            <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Meeting scheduled at 3:00 PM
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                1 hour ago
              </span>
            </li>
            <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Weekly report is ready
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Today
              </span>
            </li>
          </ul>
          <div className="mt-3 text-center">
            <button
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => setIsOpen(false)}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
