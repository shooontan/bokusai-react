/**
 * https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/3a807499dd1b9f98ff41fd72605cbfcb4e339741/src/runtime/refreshUtils.js
 * https://github.com/vercel/next.js/blob/34f82a996b42671950be9af94b5a9a8c00bf3413/packages/react-refresh-utils/internal/helpers.ts
 */

import RefreshRuntime from 'react-refresh/runtime';

type Data = Record<string, unknown>;

export type Module = {
  id: string;
  __proto__: { exports: Data | null };
  hot: {
    accept: () => void;
    dispose: (onDispose: (data: Data) => void) => void;
    invalidate: () => void;
    data?: Data;
  };
};

/**
 * Extracts exports from a webpack module object.
 */
function getModuleExports(module: Module) {
  return module.__proto__.exports || module.__proto__;
}

/**
 * Calculates the signature of a React refresh boundary.
 * If this signature changes, it's unsafe to accept the boundary.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L795-L816).
 */
function getReactRefreshBoundarySignature(
  moduleExports: ReturnType<typeof getModuleExports>
) {
  const signature = [];
  signature.push(RefreshRuntime.getFamilyByType(moduleExports));

  if (moduleExports == null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return signature;
  }

  for (let key in moduleExports) {
    if (key === '__esModule') {
      continue;
    }

    signature.push(key);
    signature.push(RefreshRuntime.getFamilyByType(moduleExports[key]));
  }

  return signature;
}

/**
 * Creates a helper that performs a delayed React refresh.
 */
function scheduleUpdate() {
  let refreshTimeout: number | NodeJS.Timeout | undefined = undefined;
  return () => {
    if (refreshTimeout === undefined) {
      refreshTimeout = setTimeout(() => {
        refreshTimeout = undefined;
        RefreshRuntime.performReactRefresh();
      }, 30);
    }
  };
}

/**
 * Checks if all exports are likely a React component.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L748-L774).
 */
function isReactRefreshBoundary(module: Module) {
  const moduleExports = getModuleExports(module);

  if (RefreshRuntime.isLikelyComponentType(moduleExports)) {
    return true;
  }

  if (moduleExports == null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return false;
  }

  let hasExports = false;
  let areAllExportsComponents = true;

  for (let key in moduleExports) {
    hasExports = true;

    // This is the ES Module indicator flag set by Webpack
    if (key === '__esModule') {
      continue;
    }

    // We can (and have to) safely execute getters here,
    // as Webpack manually assigns harmony exports to getters,
    // without any side-effects attached.
    // Ref: https://github.com/webpack/webpack/blob/b93048643fe74de2a6931755911da1212df55897/lib/MainTemplate.js#L281
    const exportValue = moduleExports[key];
    if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }

  return hasExports && areAllExportsComponents;
}

/**
 * Checks if exports are likely a React component and registers them.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L818-L835).
 */
function registerExportsForReactRefresh(module: Module) {
  const moduleExports = getModuleExports(module);
  const moduleId = module.id;

  if (RefreshRuntime.isLikelyComponentType(moduleExports)) {
    // Register module.exports if it is likely a component
    RefreshRuntime.register(moduleExports, moduleId + ' %exports%');
  }

  if (moduleExports == null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return;
  }

  for (const key in moduleExports) {
    // Skip registering the Webpack ES Module indicator
    if (key === '__esModule') {
      continue;
    }
    const exportValue = moduleExports[key];
    if (RefreshRuntime.isLikelyComponentType(exportValue)) {
      const typeID = moduleId + ' %exports% ' + key;
      RefreshRuntime.register(exportValue, typeID);
    }
  }
}

/**
 * Compares previous and next module objects to check for mutated boundaries.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L776-L792).
 */
function shouldInvalidateReactRefreshBoundary(
  prevModule: Parameters<typeof getModuleExports>[0],
  nextModule: Parameters<typeof getModuleExports>[0]
) {
  const prevSignature = getReactRefreshBoundarySignature(
    getModuleExports(prevModule)
  );
  const nextSignature = getReactRefreshBoundarySignature(
    getModuleExports(nextModule)
  );

  if (prevSignature.length !== nextSignature.length) {
    return true;
  }

  for (let i = 0; i < nextSignature.length; i += 1) {
    if (prevSignature[i] !== nextSignature[i]) {
      return true;
    }
  }

  return false;
}

export default {
  getModuleExports,
  registerExportsForReactRefresh,
  isReactRefreshBoundary,
  shouldInvalidateReactRefreshBoundary,
  getReactRefreshBoundarySignature,
  scheduleUpdate: scheduleUpdate(),
};
