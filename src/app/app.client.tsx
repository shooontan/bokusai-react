import * as React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configStore } from '~/client/store/configStore';
import App from './app';
import { RootState } from '~/client/reducers';

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState;
  }
}

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configStore({
  initialState: preloadedState,
});

loadableReady(() => {
  const appDom = document.getElementById('app');
  hydrate(
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>,
    appDom
  );
});
