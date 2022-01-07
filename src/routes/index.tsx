/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import { lazy } from 'react';
import type { RouteObject, To } from 'react-router-dom';
import {
  createSearchParams,
  matchPath,
  matchRoutes,
  resolvePath,
  useRoutes,
} from 'react-router-dom';
import type { IAccessMap } from 'src/access';
import type { LoaderComponentType, Router } from './routerTree';
import { loaderLazy, routerTree } from './routerTree';
import HomeLayout from '../layouts/homeLayout';
import type { Pages } from 'src/pages';

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
  component: LoaderComponentType;
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
        component: loaderLazy(() => import('src/pages/home')),
      },
      {
        path: 'user',
        // access: 'user',
        title: 'user',
        name: 'user',
        component: lazy(() => import('src/pages/user')),
      },
      {
        path: 'admin',
        // access: 'admin',
        title: 'admin',
        name: 'admin',
        component: lazy(() => import('src/pages/admin')),
        children: [
          {
            path: 'A1/:id',
            name: 'A1',
            title: 'A1',
            component: lazy(() => import('src/pages/admin/A1')),
          },
          {
            path: 'A2',
            name: 'A2',
            title: 'A2',
            component: lazy(() => import('src/pages/admin/A2')),
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
    const matches = matchRoutes(routes, absolutePat);
    const routeMatch = matches?.[matches.length - 1];
    const searchParams = createSearchParams(location.search);
    matches?.forEach((matchRoute) => {
      const route = matchRoute.route as Router;
      return route.fetch().then(() => {
        return route.loader?.(Object.assign({ searchParams }, routeMatch));
      });
    });
  }
};

const AppRouter = function () {
  return useRoutes(routes, location);
};
export default AppRouter;
