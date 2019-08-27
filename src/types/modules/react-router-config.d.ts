import { SwitchProps } from 'react-router';
import { CustomRouteConfig } from '~/types/app.type';

declare module 'react-router-config' {
  export function renderRoutes(
    routes: CustomRouteConfig[],
    extraProps?: any,
    switchProps?: SwitchProps
  ): JSX.Element;
}
