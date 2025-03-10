import React, { useState } from 'react';
import handleReset from './handleReset.jsx';
import handleSubtract from './handleSubstract.jsx';

function App({ defaultValue = 0 }) {
  const [count, setCount] = useState(defaultValue);

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => handleSubtract(count, setCount)}>Restar</button>
      <button onClick={() => handleReset(setCount, defaultValue)}>Resetear</button>
    </div>
  );
}

export default App;