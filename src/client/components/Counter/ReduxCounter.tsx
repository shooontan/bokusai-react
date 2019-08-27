import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/client/reducers';
import { increment, decrement } from '~/client/actions/counterAction';

const ReduxCounter = () => {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>(state => state.counter.count);
  return (
    <div>
      Counter with Redux
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default ReduxCounter;
