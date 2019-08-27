import * as React from 'react';
import { render } from '~/utils/test';
import Header from './Header';

describe('Header', () => {
  test('default', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
