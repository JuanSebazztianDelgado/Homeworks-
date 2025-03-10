import React, { useState } from 'react';

const Counter = ({ defaultValue }) => {
  const [count, setCount] = useState(defaultValue);

  const handleSubtract = () => {
    setCount(prevCount => prevCount - 1);
  };

  const handleReset = () => {
    setCount(defaultValue);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleSubtract}>Subtract</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default function handleReset(setCount, defaultValue) {
    setCount(defaultValue);
  }