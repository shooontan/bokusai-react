import { createStore, compose } from 'redux';
import reducer, { RootState } from '~/client/reducers';

export interface ConfigStoreOptions {
  initialState: Partial<RootState>;
}

export const configStore = ({ initialState }: ConfigStoreOptions) => {
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(reducer(), initialState, composeEnhancers());
  return store;
};
