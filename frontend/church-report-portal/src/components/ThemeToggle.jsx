import React, { useEffect, useState } from "react";
import { IoMoon,IoSunny } from "react-icons/io5";


const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme class to <html>
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex items-center gap-2">
      {/* <span className="text-sm dark:text-white">{theme === "light" ? "Light Mode" : "Dark Mode"}</span> */}
      <button
        onClick={toggleTheme}
        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-6 h-6 flex justify-center items-center rounded-full bg-white shadow-md transform transition-transform text-md ${
            theme === "dark" ? "translate-x-6" : ""
          }`}
        >

            {theme === 'dark' ? <IoMoon /> :<IoSunny />  }
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
