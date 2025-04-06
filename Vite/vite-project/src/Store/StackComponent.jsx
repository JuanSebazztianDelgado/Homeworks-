import { useSelector, useDispatch } from 'react-redux';
import { push, pop, clear } from './Store/Slices/stackSlice.js';
import { useState } from 'react';

export const StackComponent = () => {
  const dispatch = useDispatch();
  const stack = useSelector((state) => state.stack.stack);
  const [value, setValue] = useState('');

  const handlePush = () => {
    if (value) {
      dispatch(push(value));
      setValue('');
    }
  };

  const handlePop = () => {
    dispatch(pop());
  };

  const handleClear = () => {
    dispatch(clear());
  };

  return (
    <div>
      <h2>Stack</h2>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={handlePush}>Push</button>
      </div>
      <button onClick={handlePop}>Pop</button>
      <button onClick={handleClear}>Clear</button>
      <p>Stack: {JSON.stringify(stack)}</p>
    </div>
  );
};