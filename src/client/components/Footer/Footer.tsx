import * as React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
      <p>Footer</p>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  background: pink;

  p {
    display: inline-block;
    margin: 1em;
  }
`;
