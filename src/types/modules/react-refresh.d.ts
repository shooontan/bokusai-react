declare module 'react-refresh/runtime' {
  export function injectIntoGlobalHook(window: Window): void;
  export function register(type: unknown, id: string): void;
  export function createSignatureFunctionForTransform(): (
    type: unknown
  ) => unknown;
  export function isLikelyComponentType(module: unknown): boolean;
  export function getFamilyByType(type: unknown): unknown;
  export function performReactRefresh(): {
    updatedFamilies: Set<any>;
    staleFamilies: Set<any>;
  };
}
