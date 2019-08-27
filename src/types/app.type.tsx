import { StaticRouterContext } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { LoadableComponent } from '@loadable/component';

export type AppContext = StaticRouterContext & {
  status?: number;
  url?: string;
};

export type CustomRouteComponent<T> =
  | RouteConfig['component']
  | LoadableComponent<
      T & {
        staticContext: any;
      }
    >;

export interface CustomRouteConfig<T = unknown>
  extends Omit<RouteConfig, 'component'> {
  component?: CustomRouteComponent<T>;
  routes?: RouteConfig['routes'] | CustomRouteConfig<T>[];
}
