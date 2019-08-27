import * as React from 'react';
import { render } from '~/utils/test';
import Footer from './Footer';

describe('Footer', () => {
  test('default', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
