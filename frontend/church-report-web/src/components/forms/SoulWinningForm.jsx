import React, { useState } from "react";

const SoulWinningForm = ({ formData, handleChange }) => {
  const [errors, setErrors] = useState({});

  const calculateVariance = (current, previous) => {
    return current && previous ? current - previous : "";
  };

  // Map field names (backend) to user-friendly labels (frontend)
  const fieldLabels = {
    outreachPrograms: "Outreach Programs",
    soulsWonCOP: "Souls Won (COP Members)",
    otherSoulsWon: "Souls Won (Others)",
    soulsWonGospelSunday: "Souls Won (Gospel Sunday)",
    soulsWonDigitalSpace: "Souls Won (Digital Space)",
    soulsWonOtherReligions: "Souls Won (Other Religions)",
    convertsBaptized: "Converts Baptized",
    totalHomeCells: "Total Home Cells",
    totalAttendanceHomeCellsMembers: "Home Cell Attendance (Members)",
    totalAttendanceHomeCellsNonMembers: "Home Cell Attendance (Non-Members)",
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 dark:text-white">Soul Winning</h2>
      <div className="step soul-winning">
        {Object.keys(fieldLabels).map((field, index) => {
          const currentField = `${field}Current`;
          const previousField = `${field}Previous`;
          const varianceField = `${field}Variance`;

          return (
            <div className="form-group mb-6" key={index}>
              {/* Title for the Field */}
              <h3 className="text-lg font-semibold mb-3 dark:text-white">
                {fieldLabels[field]}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Current Input */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    CURRENT
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={currentField}
                    value={formData[currentField] || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md dark:bg-transparent dark:border-gray-600 dark:text-white ${
                      errors[currentField] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[currentField] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[currentField]}
                    </p>
                  )}
                </div>

                {/* Previous Input */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    PREVIOUS
                  </label>
                  <input
                    type="number"
                    name={previousField}
                    value={formData[previousField] || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md dark:bg-transparent dark:border-gray-600 dark:text-white ${
                      errors[previousField] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[previousField] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[previousField]}
                    </p>
                  )}
                </div>

                {/* Variance Input */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    VARIANCE
                  </label>
                  <input
                    type="number"
                    name={varianceField}
                    value={formData[varianceField] || ""}
                    readOnly
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SoulWinningForm;
