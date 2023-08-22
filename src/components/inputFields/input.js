import React, { useState } from 'react';
import { validateInput } from './validationUtils';

const Input = ({ type, name, value, onChange }) => {
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
    
    const validationError = validateInput(type, newValue);
    setError(validationError);
  };

  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
