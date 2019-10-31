import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '~/client/reducers';
import * as actions from '~/client/actions/counterAction';

const ReduxCounter = () => {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>(state => state.counter.count);
  return (
    <div>
      Good counter with Redux
      <p>{count}</p>
      <Button onClick={() => dispatch(actions.increment())}>👍</Button>
      <Button onClick={() => dispatch(actions.decrement())}>👎</Button>
      <Button onClick={() => dispatch(actions.force(0))}>0️⃣</Button>
    </div>
  );
};

export default ReduxCounter;

const Button = styled.button`
  margin: 1em;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  border: none;
`;
