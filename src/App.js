import React, { useState } from 'react';
import JsonInputForm from './JsonInputForm';
import MultiSelect from './MultiSelect';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);

  const handleJsonSubmit = async (jsonData) => {
    try {
      const res = await fetch('http://', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      const result = await res.json();
      setResponse(result);
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMultiSelectChange = (value, checked) => {
    setSelectedOptions((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((option) => option !== value);
      }
    });
  };

  const getFilteredData = () => {
    if (!response) return {};

    const filteredData = {};

    if (selectedOptions.includes('Characters') && response.characters) {
      filteredData.characters = response.characters.join(', ');
    }

    if (selectedOptions.includes('Numbers') && response.numbers) {
      filteredData.numbers = response.numbers.join(', ');
    }

    if (selectedOptions.includes('Highest Alphabet') && response.highestAlphabet) {
      filteredData.highestAlphabet = response.highestAlphabet;
    }

    return filteredData;
  };

  const filteredData = getFilteredData();

  return (
    <div className="app-container">
      <h1>RA2111004010123</h1>
      <JsonInputForm onSubmit={handleJsonSubmit} />
      {data && (
        <MultiSelect
          options={['Characters', 'Numbers', 'Highest Alphabet']}
          selectedOptions={selectedOptions}
          onChange={handleMultiSelectChange}
        />
      )}
      <div className="response-container">
        {filteredData.characters && (
          <div>Characters: {filteredData.characters}</div>
        )}
        {filteredData.numbers && (
          <div>Numbers: {filteredData.numbers}</div>
        )}
        {filteredData.highestAlphabet && (
          <div>Highest Alphabet: {filteredData.highestAlphabet}</div>
        )}
      </div>
    </div>
  );
};

export default App;
