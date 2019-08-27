import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #app {
    height: 100%;
  }

  body {
    margin: 0
  }
`;

export default GlobalStyle;
