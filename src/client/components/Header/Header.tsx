import * as React from 'react';
import styled from 'styled-components';
import Link from '~/client/components/Link';

const Header = () => {
  return (
    <StyledHeader>
      <p>
        <Link to="/">top</Link>
      </p>
      <p>
        <Link to="/about">about</Link>
      </p>
      <p>
        <Link to="/404">404</Link>
      </p>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  background: pink;

  p {
    display: inline-block;
    margin: 1em;
  }
`;
