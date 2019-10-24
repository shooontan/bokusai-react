import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { routes, NotFoundPage } from '~/app/app';
import { isElement, isLoadableComponent, findRoute } from './utils';

export type CustomLinkProps = NavLinkProps;

export default class CustomLink extends React.Component<NavLinkProps> {
  private linkRef = React.createRef<NavLink>();
  private observer?: IntersectionObserver;
  private isIntersected: boolean = false;

  state = {
    preloaded: false,
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const next = ratio > 0;
        if (!this.isIntersected && next) {
          this.onEnter();
        }
        this.isIntersected = next;
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0],
      }
    );

    if (isElement(this.linkRef.current)) {
      this.observer.observe(this.linkRef.current);
    }
  }

  componentWillUnmount() {
    if (this.observer && isElement(this.linkRef.current)) {
      this.observer.unobserve(this.linkRef.current);
    }
  }

  onEnter = () => {
    if (!this.state.preloaded) {
      this.preloadRouteComponent(this.props.to);
    }
  };

  preloadRouteComponent(to: NavLinkProps['to']) {
    const path = typeof to === 'string' ? to : '/';
    const matchingRoute = findRoute(path, routes);
    if (matchingRoute && isLoadableComponent(matchingRoute.component)) {
      matchingRoute.component.preload();
    } else {
      NotFoundPage.preload();
    }
    this.setState({ preloaded: true });
  }

  handleMouseEnter = () => {
    if (!this.state.preloaded) {
      this.preloadRouteComponent(this.props.to);
    }
  };

  render() {
    return (
      <NavLink
        ref={this.linkRef}
        onMouseEnter={this.handleMouseEnter}
        {...this.props}
      />
    );
  }
}
