import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';

const Layout = loadable(() => import('~/client/layouts/default'));

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <Layout>
      <Helmet>
        <title>about</title>
      </Helmet>
      <p>About Page</p>
    </Layout>
  );
};

export default AboutPage;
