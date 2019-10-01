export const increment = () =>
  ({
    type: 'INCREMENT',
  } as const);

export const decrement = () =>
  ({
    type: 'DECREMENT' as const,
  } as const);

export const force = (num: number) =>
  ({
    type: 'FORCE',
    payload: num,
  } as const);
