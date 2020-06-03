import { RefreshRuntimeGlobals } from './runtime';
import { Module } from './helpers';

declare global {
  interface Window extends RefreshRuntimeGlobals {}
}

declare const module: Module;

export function ReactRefreshModule() {
  if (typeof window !== 'undefined' && window.$RefreshHelpers$) {
    window.$RefreshHelpers$.registerExportsForReactRefresh(module);

    if (module.hot && window.$RefreshHelpers$.isReactRefreshBoundary(module)) {
      module.hot.dispose(data => {
        data.module = module;
      });
      module.hot.accept();

      if (module.hot.data) {
        if (
          !module.hot.data.module ||
          window.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(
            module.hot.data.module as Module,
            module
          )
        ) {
          module.hot.invalidate();
        }
        window.$RefreshHelpers$.scheduleUpdate();
      }
    }
  }
}
