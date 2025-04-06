import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementBy } from './Store/Slices/counterSlice.js';
import { useState } from 'react';

export const App = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.counter);
  const [incrementValue, setIncrementValue] = useState(0);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementBy = () => {
    dispatch(incrementBy(Number(incrementValue)));
  };

  return (
    <>
      <p>Counter is: {count}</p>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <div>
        <input
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={handleIncrementBy}>Increment by Value</button>
      </div>
    </>
  );
};