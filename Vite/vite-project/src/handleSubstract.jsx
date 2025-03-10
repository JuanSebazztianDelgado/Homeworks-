import React, { useState } from 'react';

const Counter = ({ defaultValue }) => {
  const [count, setCount] = useState(defaultValue);

  const handleSubstract = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleSubstract}>Subtract</button>
    </div>
  );
};

export default function handleSubtract(count, setCount) {
    setCount(count - 1);
  }