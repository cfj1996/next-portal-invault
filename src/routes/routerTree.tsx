/**
 * @name: useAppRoutes
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import type { ComponentType } from 'react';
import React, { Fragment, useEffect } from 'react';
import type { RouteOptions } from '.';
import useAccess from '../access';
import Error403 from '../pages/error/403';
import pages from 'src/pages';

export interface Router extends RouteOptions {
  preFetch: () => Promise<{ default: ComponentType | null }>;
  children?: Router[];
  isLoad?: boolean;
  element: React.ReactNode;
  asyncComponent?: ComponentType;
}

export function routerTree(options: RouteOptions[]): Router[] {
  return options.map((option) => {
    const { children, name, ...output } = option;
    const data: Router = {
      ...output,
      children: children?.length ? routerTree(children) : undefined,
      element: <RouteComponent {...option} component={Component} />,
      preFetch: () => {
        if (name && !data.isLoad && !data.asyncComponent) {
          data.isLoad = true;
          return pages[name]().then((res) => {
            data.isLoad = false;
            data.asyncComponent = res.default;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data.asyncComponent?.preFetchData?.();
            return res;
          });
        } else {
          return Promise.resolve({ default: null });
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
function wrapper(arr: React.ComponentType[] = [], RootCom?: ComponentType) {
  const Com = RootCom || Fragment;
  let children = null;
  if (arr.length > 0) {
    const C = arr.shift();
    children = wrapper(arr, C);
  }
  return <Com>{children}</Com>;
}
