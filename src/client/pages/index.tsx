import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';

const Layout = loadable(() => import('~/client/layouts/default'));

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const [date, setDate] = React.useState<string>();

  // async await flow
  React.useEffect(() => {
    (async () => {
      try {
        const res: { request: boolean; time: string } = await fetch(
          '/api'
        ).then(res => res.json());
        setDate(res.time);
      } catch (_) {
        //
      }
    })();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>index</title>
      </Helmet>
      <p>Index Page</p>
      {date ? date : 'loading...'}
    </Layout>
  );
};

export default IndexPage;
