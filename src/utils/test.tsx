import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

const Wrapper: React.FC = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
