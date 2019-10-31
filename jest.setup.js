require('jest-styled-components');

global.beforeEach(() => {
  // for Link Component
  global.IntersectionObserver = class IntersectionObserver {
    observe() {
      return null;
    }

    unobserve() {
      return null;
    }
  };
});
