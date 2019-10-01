import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/client/reducers';
import * as actions from '~/client/actions/counterAction';

const ReduxCounter = () => {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>(state => state.counter.count);
  return (
    <div>
      Counter with Redux
      <p>{count}</p>
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.decrement())}>-</button>
      <button onClick={() => dispatch(actions.force(0))}>0</button>
    </div>
  );
};

export default ReduxCounter;
