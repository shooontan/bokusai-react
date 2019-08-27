import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';

const Layout = loadable(() => import('~/client/layouts/default'));

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <Layout>
      <Helmet>
        <title>index</title>
      </Helmet>
      <p>Index Page</p>
    </Layout>
  );
};

export default IndexPage;
