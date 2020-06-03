import * as React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import loadable from '@loadable/component';
import { CustomRouteConfig } from '~/types/app.type';

const IndexPage = loadable(() => import('~/client/pages/index'));
const AboutPage = loadable(() => import('~/client/pages/about'));
export const NotFoundPage = loadable(() => import('~/client/pages/404'));

export const routes: CustomRouteConfig[] = [
  { component: IndexPage, path: '/', exact: true },
  { component: AboutPage, path: '/about', exact: true },
  { component: NotFoundPage },
];

const App = () => <Switch>{renderRoutes(routes)}</Switch>;

export default App;
