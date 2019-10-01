import { Reducer } from 'redux';
import * as actions from '~/client/actions/counterAction';
import { ActionTypesCreator } from '~/client/reducers/utils';

type Actions = ActionTypesCreator<typeof actions>;

export type CounterState = {
  count: number;
};

export const initialCounterState: CounterState = {
  count: 0,
};

export const counterReducer: Reducer<CounterState, Actions> = (
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
        count: action.payload,
      };
    }

    default:
      return state;
  }
};
