import React from "react";
import { useState } from "react";

const Baptism = ({ formData, handleChange }) => {
  const [errors, setErrors] = useState({});

  const calculateVariance = (current, previous) => {
    return current && previous ? current - previous : "";
  };

    // Map field names (backend) to user-friendly labels (frontend)
    const fieldLabels = {
      baptizedInHolySpiritChildren: "baptizedInHolySpiritChildren",
      baptizedInHolySpiritNewConverts: "No. of New Converts Baptized in Holy Spirit",
      baptizedInHolySpiritOldMembers: "No. of Old Members Baptized in Holy Spirit",
      midWeekTeachingSessions: "No. of Mid-Week Teaching sessions organized)",
      convertsBaptized: "Converts Baptized",
      avgMidWeekServiceAttendance: "Average attendance at Mid-Week Service",
      fridayPrayerSessions: "No. of Friday Weekly Prayer Sessions Held",
      avgFridayPrayerAttendance: "Average attendance at Friday Weekly Prayer sessions",
    };

	return (
		<div>
 <h2 className="text-3xl font-bold mb-4 dark:text-white">Baptism</h2>
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
                    name={`baptism.${currentField}`}
                    value={formData.baptism[currentField] || ""}
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
                    name={`baptism.${previousField}`}
                    value={formData.baptism[previousField] || ""}
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
                    name={`baptism.${varianceField}`}
                    value={formData.baptism[varianceField] || ""}
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

export default Baptism;
