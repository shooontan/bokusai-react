import * as React from 'react';

const HookCounter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      Counter with State
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default HookCounter;
