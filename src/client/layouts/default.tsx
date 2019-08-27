import * as React from 'react';
import loadable from '@loadable/component';
import styled from 'styled-components';
import Header from '~/client/components/Header';
import Footer from '~/client/components/Footer';
import GlobalStyle from '@/client/layouts/GlobalStyle';

const HookCounter = loadable(() =>
  import('~/client/components/Counter/HookCounter')
);
const ReduxCounter = loadable(() =>
  import('~/client/components/Counter/ReduxCounter')
);

const Layout: React.FC = props => {
  return (
    <Inner>
      <GlobalStyle />
      <Header />
      <Main>
        {props.children}
        <HookCounter />
        <ReduxCounter />
      </Main>
      <Footer />
    </Inner>
  );
};

export default Layout;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  main {
    flex: 1;
  }
`;

const Main = styled.main`
  padding: 1em;
`;
