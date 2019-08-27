import { combineReducers } from 'redux';
import { counterReducer, CounterState } from './counter';

export type RootState = {
  counter: CounterState;
};

export default function reducer() {
  return combineReducers({
    counter: counterReducer,
  });
}
