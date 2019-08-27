import { CounterAction } from '~/client/actions/counterAction';
import { Reducer } from 'redux';

export interface CounterState {
  count: number;
}

export const initialCounterState: CounterState = {
  count: 0,
};

export const counterReducer: Reducer<CounterState, CounterAction> = (
  state = initialCounterState,
  action
) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case 'DECREMENT': {
      return {
        ...state,
        count: state.count - 1,
      };
    }

    case 'FORCE': {
      return {
        ...state,
        count: state.count,
      };
    }

    default:
      return state;
  }
};
