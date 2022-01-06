/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import { lazy } from 'react';
import type { RouteObject, To } from 'react-router-dom';
import { matchPath, matchRoutes, resolvePath, useRoutes } from 'react-router-dom';
import type { IAccessMap } from '../access';
import type { Router } from './routerTree';
import { routerTree } from './routerTree';
import HomeLayout from '../layouts/homeLayout';
import type { Pages } from 'src/pages';
import pages from 'src/pages';

export interface RouteOptions extends Omit<RouteObject, 'element' | 'children'> {
  // 与page/index 导出的对象的key值对应
  name?: keyof Pages;
  // 页面title
  title?: string;
  // 角色权限
  access?: keyof IAccessMap;
  // 高阶组件拦截
  wrappers?: React.ComponentType[];
  // 渲染组件
  component: React.ComponentType;
  // 嵌套路由
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
        component: lazy(pages.home),
      },
      {
        path: 'user',
        access: 'user',
        title: 'user',
        name: 'user',
        component: lazy(pages.user),
      },
      {
        path: 'admin',
        access: 'admin',
        title: 'admin',
        name: 'admin',
        component: lazy(pages.admin),
        children: [
          {
            path: 'A1/:id',
            name: 'A1',
            title: 'A1',
            component: lazy(pages.A1),
          },
          {
            path: 'A2',
            name: 'A2',
            title: 'A2',
            component: lazy(pages.A2),
          },
        ],
      },
    ],
  },
];
export const routes = routerTree(routeOptions);
export const prefetch = function (path: To) {
  const absolutePat = resolvePath(path, location.pathname);
  if (!matchPath(absolutePat.pathname, location.pathname)) {
    const mRoutes = matchRoutes(routes, absolutePat);
    mRoutes?.forEach((matchRoute) => {
      const route = matchRoute.route as Router;
      return route.preFetch?.();
    });
  }
};

const AppRouter = function () {
  return useRoutes(routes, location);
};
export default AppRouter;
