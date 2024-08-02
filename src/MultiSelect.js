import React from 'react';

const MultiSelect = ({ options, selectedOptions, onChange }) => {
  return (
    <div className="multiselect-container">
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={(e) => onChange(option, e.target.checked)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default MultiSelect;
