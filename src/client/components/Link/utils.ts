import { matchPath } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';
import { CustomRouteConfig } from '~/types/app.type';

export const isElement = (target: unknown): target is Element => {
  return target instanceof Element;
};

export const isLoadableComponent = (
  component: CustomRouteConfig['component']
): component is LoadableComponent<unknown> => {
  if (Object.getOwnPropertyNames(component).includes('preload')) {
    return true;
  }
  return false;
};

export const findRoute = (
  path: string,
  routes: CustomRouteConfig[]
): CustomRouteConfig | undefined => {
  const matchingRoute = routes.find(route =>
    matchPath(path, {
      ...route,
    })
  );
  if (matchingRoute && matchingRoute.routes) {
    return findRoute(path, matchingRoute.routes);
  }
  return matchingRoute;
};
