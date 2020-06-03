import RefreshRuntime from 'react-refresh/runtime';
import RefreshHelpers from './helpers';

export type RefreshRuntimeGlobals = {
  $RefreshReg$: (type: unknown, id: string) => void;
  $RefreshSig$: () => (type: unknown) => unknown;
  $RefreshInterceptModuleExecution$: (moduleId: string) => () => void;
  $RefreshHelpers$: typeof RefreshHelpers;
};

declare global {
  interface Window extends RefreshRuntimeGlobals {}
}

// Hook into ReactDOM initialization
RefreshRuntime.injectIntoGlobalHook(window);

// noop fns to prevent runtime errors during initialization
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => type => type;

// Register global helpers
window.$RefreshHelpers$ = RefreshHelpers;

// Register a helper for module execution interception
window.$RefreshInterceptModuleExecution$ = function(webpackModuleId) {
  console.log(webpackModuleId);
  const prevRefreshReg = window.$RefreshReg$;
  const prevRefreshSig = window.$RefreshSig$;

  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, webpackModuleId + ' ' + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;

  // Modeled after `useEffect` cleanup pattern:
  // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  return () => {
    window.$RefreshReg$ = prevRefreshReg;
    window.$RefreshSig$ = prevRefreshSig;
  };
};
