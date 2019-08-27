import * as React from 'react';
import { render } from '~/utils/test';
import Link from './Link';

describe('Link', () => {
  test(`to '/'`, () => {
    const { container } = render(<Link to="/" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`to '/about'`, () => {
    const { container } = render(<Link to="/about" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
