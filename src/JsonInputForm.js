import React, { useState } from 'react';

const JsonInputForm = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      onSubmit(parsedInput);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Input
        <input
          type="text"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data":["A","C","z"]}'
        />
      </label>
      <button type="submit">Submit</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default JsonInputForm;
