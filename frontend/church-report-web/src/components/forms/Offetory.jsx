import React, { useState } from 'react';

const Offertory = () => {
  const [formData, setFormData] = useState({
    grossTithes: '',
    netTithes: '',
    missionsOffering: '',
    designatedFund: '',
    localFund: '',
    localExpenditure: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 dark:text-white">Offertory</h2>
      <div className="step offertory grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Input Fields */}
        {[
          { label: 'Gross Tithes', name: 'grossTithes' },
          { label: 'Net Tithes', name: 'netTithes' },
          { label: 'Missions Offering', name: 'missionsOffering' },
          { label: 'Designated Fund', name: 'designatedFund' },
          { label: 'Local Fund', name: 'localFund' },
          { label: 'Local Expenditure', name: 'localExpenditure' },
        ].map((field) => (
          <div className="form-group mb-4" key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium mb-1 dark:text-white"
            >
              {field.label}
            </label>
            <input
              type="number"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md dark:bg-transparent dark:border-gray-600 dark:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offertory;