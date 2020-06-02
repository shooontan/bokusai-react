import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';

const Layout = loadable(() => import('~/client/layouts/default'));

export interface NotFoundProps {
  staticContext?: {
    status?: number;
  };
}

const NotFoundPage: React.FC<NotFoundProps> = ({ staticContext }) => {
  if (staticContext) {
    staticContext.status = 404;
  }
  return (
    <Layout>
      <Helmet>
        <title>404</title>
      </Helmet>
      <p>404</p>
    </Layout>
  );
};

export default NotFoundPage;
