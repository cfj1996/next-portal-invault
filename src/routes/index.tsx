/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import type React from 'react';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import type { IAccessMap } from '../access';
import { useAppRoutes } from './useAppRoutes';
import HomeLayout from '../layouts/homeLayout';

export interface RouteOptions extends Omit<RouteObject, 'element' | 'children'> {
  name?: string;
  title?: string;
  access?: keyof IAccessMap;
  wrappers?: React.ComponentType[];
  component: React.ComponentType;
  children?: RouteOptions[];
}

const routeOptions: RouteOptions[] = [
  {
    component: HomeLayout,
    children: [
      {
        index: true,
        title: 'home',
        name: 'home',
        component: lazy(() => import('../pages/home')),
      },
      {
        path: 'user',
        access: 'user',
        title: 'user',
        name: 'user',
        component: lazy(() => import('src/pages/user')),
      },
      {
        path: 'admin',
        access: 'admin',
        title: 'admin',
        name: 'admin',
        component: lazy(() => import('src/pages/admin')),
        children: [
          {
            path: 'A1',
            title: 'A1',
            component: lazy(() => import('../pages/admin/A1')),
          },
          {
            path: 'A2',
            title: 'A2',
            component: lazy(() => import('../pages/admin/A2')),
          },
        ],
      },
    ],
  },
];
const AppRouter = function () {
  return useAppRoutes(routeOptions);
};
export default AppRouter;
