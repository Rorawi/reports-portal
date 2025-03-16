import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export const ClickEffectSearchComponent = () => {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput); // Toggle visibility
  };

  return (
    <div
      className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333] group-hover transition-all duration-300 ease-in-out"
      onClick={handleClick}
    >
      <IoSearch className="w-5 h-5 dark:text-white" />
      {showInput && (
        <input
          type="text"
          className="ms-3 dark:text-white dark:bg-[#333333] outline-none"
          placeholder="Search..."
          autoFocus
        />
      )}
    </div>
  );
};

export const NoClickEffectSearchComponent = () => {
  return (
    <div
      className="p-2 rounded-full flex lg:justify-center items-center dark:shadow-md cursor-pointer dark:bg-[#333333] group-hover transition-all duration-300 ease-in-out w-full"
    >
      <IoSearch className="w-5 h-5 dark:text-white" />
        <input
          type="text"
          className="ms-3 dark:text-white dark:bg-[#333333] outline-none w-full lg:w-96 lg:max-w-96"
          placeholder="Search..."
          autoFocus
        />
    </div>
  );
};

