import * as React from 'react';
import { NavLink, NavLinkProps, matchPath } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';
import { routes, NotFoundPage } from '~/app/app';
import { CustomRouteConfig } from '~/types/app.type';

export type CustomLinkProps = NavLinkProps;

export default class CustomLink extends React.Component<NavLinkProps> {
  state = {
    preloaded: false,
  };

  preloadRouteComponent(to: NavLinkProps['to']) {
    const path = typeof to === 'string' ? to : '/';
    const matchingRoute = this.findRoute(path, routes);
    if (matchingRoute && this.isLoadableComponent(matchingRoute.component)) {
      matchingRoute.component.preload();
    } else {
      NotFoundPage.preload();
    }
    this.setState({ preloaded: true });
  }

  isLoadableComponent(
    component: CustomRouteConfig['component']
  ): component is LoadableComponent<unknown> {
    if (Object.getOwnPropertyNames(component).includes('preload')) {
      return true;
    }
    return false;
  }

  findRoute(
    path: string,
    routes: CustomRouteConfig[]
  ): CustomRouteConfig | undefined {
    const matchingRoute = routes.find(route =>
      matchPath(path, {
        ...route,
      })
    );
    if (matchingRoute && matchingRoute.routes) {
      return this.findRoute(path, matchingRoute.routes);
    }
    return matchingRoute;
  }

  handleMouseEnter = () => {
    if (!this.state.preloaded) {
      this.preloadRouteComponent(this.props.to);
    }
  };

  render() {
    return <NavLink onMouseEnter={this.handleMouseEnter} {...this.props} />;
  }
}
