/**
 * @name: useAppRoutes
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import type { ComponentType, ReactElement } from 'react';
import React, { Fragment, lazy, useEffect } from 'react';
import type { RouteOptions } from '.';
import useAccess from '../access';
import Error403 from '../pages/error/403';
import type { RouteMatch } from 'react-router-dom';

export type LoaderParams = RouteMatch & { searchParams: URLSearchParams };

export type Loader = (routeMatch: LoaderParams) => void;

export type LoaderComponentType = ComponentType & { loader?: Loader };

export type Fetch = () => Promise<{ default: LoaderComponentType }>;

export type FetchComponentType = ComponentType & { fetch?: Fetch };

export interface Router extends RouteOptions {
  fetch: Fetch;
  loader?: Loader;
  children?: Router[];
  isLoad?: boolean;
  element: React.ReactNode;
  asyncComponent?: LoaderComponentType;
}

export function routerTree(options: RouteOptions[]): Router[] {
  return options.map((option) => {
    const { children, ...output } = option;
    const data: Router = {
      ...output,
      children: children?.length ? routerTree(children) : undefined,
      element: <RouteComponent {...option} component={Component} />,
      fetch: () => {
        if (output.component.fetch && !data.isLoad && !data.asyncComponent) {
          data.isLoad = true;
          return output.component.fetch().then((res) => {
            const component = res.default as LoaderComponentType;
            data.isLoad = false;
            data.asyncComponent = component;
            data.loader = component.loader;
            return res;
          });
        } else {
          return Promise.resolve({ default: Fragment });
        }
      },
    };
    function Component() {
      return React.createElement(data.asyncComponent || data.component);
    }
    return data;
  });
}

function RouteComponent(props: Pick<RouteOptions, 'component' | 'title' | 'access' | 'wrappers'>) {
  console.log(2);
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
function wrapper(arr: React.ComponentType[] = [], RootCom?: ComponentType): ReactElement {
  const type = RootCom || Fragment;
  let children = null;
  if (arr.length > 0) {
    const C = arr.shift();
    children = wrapper(arr, C);
  }
  return React.createElement(type, {}, children);
}

export const loaderLazy: (fn: Fetch) => FetchComponentType = function (fn) {
  const component = lazy(fn) as FetchComponentType;
  component.fetch = fn;
  return component;
};
