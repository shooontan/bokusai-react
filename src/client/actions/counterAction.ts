import { Action } from 'redux';

export type AppAction<T extends string, Extra extends {} = {}> = Action<T> &
  { [K in keyof Extra]: Extra[K] };

enum ActionType {
  increment = 'INCREMENT',
  decrement = 'DECREMENT',
  force = 'FORCE',
}

export type CounterAction =
  | AppAction<ActionType.increment>
  | AppAction<ActionType.decrement>
  | AppAction<ActionType.force, { count: number }>;

const increment = (): CounterAction => ({
  type: ActionType.increment,
});

const decrement = (): CounterAction => ({
  type: ActionType.decrement,
});

const force = (num: number): CounterAction => {
  return {
    type: ActionType.force,
    count: num,
  };
};

export { increment, decrement, force };
