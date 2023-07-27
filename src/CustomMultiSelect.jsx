import React, { useState } from "react";

const CustomMultiSelect = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="custom-multi-select">
      <div className="options">
        {options.map((option) => (
          <label key={option} className="option">
            <input
              type="radio"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionClick(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomMultiSelect;
