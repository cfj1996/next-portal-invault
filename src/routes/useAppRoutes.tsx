/**
 * @name: useAppRoutes
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import type { ComponentType } from 'react';
import React, { Fragment, useEffect } from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import type { RouteOptions } from '.';
import useAccess from '../access';
import Error403 from '../pages/error/403';

export function useAppRoutes(options: RouteOptions[], locationArg?: Partial<Location> | string) {
  const routes = options.map((routerOption) => {
    const { root, prefetch } = new RouteChildren(routerOption);
    return root;
  });
  return useRoutes(routes, locationArg);
}
class RouteChildren {
  constructor(private options: RouteOptions) {}
  get root(): RouteObject {
    if (this.options?.children) {
      return {
        index: this.options.index,
        path: this.options.path,
        element: this.element,
        children: this.options.children.map((options) => new RouteChildren(options).root),
      };
    } else {
      return {
        index: this.options.index,
        path: this.options.path,
        element: this.element,
      };
    }
  }
  get element() {
    return (
      <RouteComponent
        component={this.options.component}
        title={this.options.title}
        access={this.options.access}
        wrappers={this.options.wrappers}
      />
    );
  }
  public prefetch() {
    return this.element;
  }
}

function RouteComponent(props: Pick<RouteOptions, 'component' | 'title' | 'access' | 'wrappers'>) {
  const accessMap = useAccess();
  const { component: Component, title, access, wrappers } = props;
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  });
  if (access && !accessMap[access]) {
    return <Error403 />;
  }
  if (wrappers && wrappers?.length > 0) {
    return wrapper(wrappers);
  }
  return <Component />;
}
function wrapper(arr: React.ComponentType[] = [], RootCom?: ComponentType) {
  const Com = RootCom || Fragment;
  let children = null;
  if (arr.length > 0) {
    const C = arr.shift();
    children = wrapper(arr, C);
  }
  return <Com>{children}</Com>;
}
